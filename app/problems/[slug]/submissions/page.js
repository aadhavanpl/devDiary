'use client'
import React, { useEffect, useState } from 'react'
import styles from '../slug.module.css'
import { GoogleSignInButton, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import Submission from '@/components/common/Submission'
import { useParams } from 'next/navigation'

export default function Submissions() {
	const params = useParams()
	const [submissions, setSubmissions] = useState()

	useEffect(() => {
		async function fetchSubmissions() {
			const res = await fetch('http://localhost:3000/api/submissions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
					slug: 'longest-substring-without-repeating-characters',
				}),
			})
			const data = await res.json()
			console.log(data)
			console.log(data.submissionAPI[0].problems)
			// setSubmissions(submissions.submissionsAPI[0].problems[0].submissions)
		}
		fetchSubmissions()
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src='/svgs/logo.svg' className={styles.logo} />
				<GoogleSignInButton />
			</div>
			<ProblemNoClick />
			<div className={styles.previousSubmissionWrapper}>
				<SubHeading subheading='Previous submissions' />
				{submissions
					? submissions.map((submission, index) => (
							<Submission
								number={index + 1}
								date={submission.date}
								duration={submission.time}
								key={index + 1}
							/>
					  ))
					: null}
			</div>
		</div>
	)
}
