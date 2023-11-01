'use client'
import React, { useEffect, useState } from 'react'
import styles from '../slug.module.css'
import { GoogleSignInButton, SignedIn, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import Submission from '@/components/common/Submission'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGlobalContext } from '@/lib/utils/globalContext'
import Loader from '@/components/common/Loader'

export default function Submissions() {
	const params = useParams()
	const [submissions, setSubmissions] = useState()
	const { user } = useGlobalContext()
	const pathname = usePathname()
	const [loader, setLoader] = useState(true)
	const [currProblem, setCurrProblem] = useState('')
	const [completionStatus, setCompletionStatus] = useState(false)
	const [bookmark, setBookmark] = useState(0)

	useEffect(() => {
		if (!user) return
		async function fetchProblemDetails() {
			const res = await fetch('https://devdiary.live/api/fetchProblem', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: params?.slug,
				}),
			})
			const data = await res.json()
			if (data.tempProblems.length == 0) router.push('/problems')
			setCurrProblem(data.tempProblems[0])
		}
		fetchProblemDetails()

		async function fetchUserProblemDetails() {
			const res = await fetch('https://devdiary.live/api/fetchUserProblemDetails', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
					slug: params?.slug,
				}),
			})
			const tempData = await res.json()
			const data = tempData?.userProblems[0]?.problems
			if (data) {
				if (data.submissions.length) setCompletionStatus(true)
				setBookmark(data.bookmark)
			}
		}
		fetchUserProblemDetails()

		async function fetchSubmissions() {
			const res = await fetch('https://devdiary.live/api/submissions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
					slug: params?.slug,
				}),
			})
			const data = await res.json()
			setSubmissions(data?.submissionsAPI)
		}
		fetchSubmissions()
		setLoader(false)
	}, [user])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Link href='/' className={styles.link}>
					<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
				</Link>
				<div className={styles.googleSignIn}>
					{user ? <SignedIn photoURL={user ? user?.user_photo : null} /> : <GoogleSignInButton />}
				</div>
			</div>
			<ProblemNoClick data={currProblem} done={completionStatus} bookmark={bookmark} />
			<div className={styles.previousSubmissionWrapper}>
				<SubHeading subheading='Previous submissions' />
				{submissions?.length > 0 && submissions
					? submissions?.map((submission, index) => (
							<Submission
								number={index + 1}
								date={submission?.date}
								time={submission?.time}
								duration={submission?.duration}
								key={index + 1}
								pathname={pathname}
								id={submission?._id}
							/>
					  ))
					: null}
			</div>
			<Loader loader={loader} />
		</div>
	)
}
