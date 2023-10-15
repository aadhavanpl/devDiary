'use client'
import React, { useState } from 'react'
import styles from '../slug.module.css'
import { GoogleSignInButton, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import Submission from '@/components/common/Submission'

export default function History() {
	const [feature, setFeature] = useState(0)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src='/svgs/logo.svg' className={styles.logo} />
				<GoogleSignInButton />
			</div>
			<ProblemNoClick />
			<div className={styles.previousSubmissionWrapper}>
				<SubHeading subheading='Previous submissions' />
				<Submission number={7} />
				<Submission number={6} />
				<Submission number={5} />
				<Submission number={4} />
				<Submission number={3} />
				<Submission number={2} />
				<Submission number={1} />
			</div>
		</div>
	)
}
