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
	console.log(params)

	useEffect(() => {
		if (!user) return
		async function fetchSubmissions() {
			const res = await fetch('http://localhost:3000/api/submissions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
					slug: params?.slug,
				}),
			})
			const data = await res.json()
			setSubmissions(data?.submissionsAPI[0]?.problems[0].submissions)
			setLoader(false)
		}
		fetchSubmissions()
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
			<ProblemNoClick />
			<div className={styles.previousSubmissionWrapper}>
				<SubHeading subheading='Previous submissions' />
				{submissions?.length > 0 && submissions
					? submissions?.map((submission, index) => (
							<Submission
								number={index + 1}
								date={submission?.date}
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
