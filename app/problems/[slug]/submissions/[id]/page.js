'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Editor } from '@monaco-editor/react'
import { useRouter, useParams } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import { GoogleSignInButton, SignedIn } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import Loader from '@/components/common/Loader'
import LanguageSelector from '@/components/common/LanguageSelector'

import styles from '../../slug.module.css'

export default function SubmissionSlug() {
	const [feature, setFeature] = useState(0)
	const router = useRouter()
	const params = useParams()
	const editorRef = useRef(null)
	const { user } = useGlobalContext()
	const [currProblem, setCurrProblem] = useState()
	const [completionStatus, setCompletionStatus] = useState(false)
	const [bookmark, setBookmark] = useState(0)

	const [loader, setLoader] = useState(true)
	const [submissionData, setSubmissionData] = useState()

	function handleEditorDidMount(editor) {
		editorRef.current = editor
	}

	useEffect(() => {
		if (!user) return
		async function fetchProblemDetails() {
			const res = await fetch('http://localhost:3000/api/fetchProblem', {
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
			const res = await fetch('http://localhost:3000/api/fetchUserProblemDetails', {
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

		async function fetchSubmission() {
			const res = await fetch('http://localhost:3000/api/submission', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
					slug: params?.slug,
					id: params?.id,
				}),
			})
			let data = await res.json()

			function secondsToHMS(seconds) {
				const hours = Math.floor(seconds / 3600)
				seconds %= 3600
				const minutes = Math.floor(seconds / 60)
				seconds %= 60
				return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
					seconds
				).padStart(2, '0')}`
			}

			data.submissionAPI[0].problems.submissions[0].duration = secondsToHMS(
				data.submissionAPI[0].problems.submissions[0].duration
			)
			setSubmissionData(data.submissionAPI[0].problems.submissions[0])
		}
		fetchSubmission()
		setLoader(false)
	}, [user])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Link href='/' className={styles.link}>
					<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
				</Link>
				<div className={styles.googleSignIn}>
					{user ? <SignedIn photoURL={user?.user_photo} /> : <GoogleSignInButton />}
				</div>
			</div>
			<ProblemNoClick data={currProblem} bookmark={bookmark} done={completionStatus} />
			<div className={styles.wrapper}>
				<Editor
					width='calc(100vw - 550px)'
					height='calc(100vh - 260px)'
					theme='vs-dark'
					className={styles.editor}
					onMount={handleEditorDidMount}
					value={submissionData?.code}
					language={submissionData?.language}
					options={{ domReadOnly: true, readOnly: true, fontSize: 17 }}
				/>
				<div className={styles.features}>
					<LanguageSelector language={submissionData?.language} disabled />
					<div className={styles.topWrapper}>
						<div className={styles.toggleWrapper}>
							<div className={styles.linksWrapper}>
								<div
									className={styles.toggle}
									style={{ borderBottom: feature ? '4px solid #b235ff' : '' }}
									onClick={() => setFeature(1)}
								>
									Time taken
								</div>
								<div
									className={styles.toggle}
									style={{ borderBottom: feature ? '' : '4px solid #b235ff', marginLeft: '24px' }}
									onClick={() => setFeature(0)}
								>
									Notes
								</div>
							</div>
						</div>
						<div className={styles.feature}>
							{feature ? (
								<div className={styles.timeTaken}>
									<img src='/svgs/time-taken.svg' />
									<div className={styles.timeTakenHeading}>Time taken</div>
									{submissionData?.duration}
								</div>
							) : (
								<div className={styles.notes}>
									<textarea
										className={styles.textarea}
										defaultValue={submissionData?.note}
										placeholder='Enter your notes here'
										disabled
									></textarea>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Loader loader={loader} />
		</div>
	)
}
