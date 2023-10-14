import React from 'react'
import styles from './slug.module.css'
import { GoogleSignInButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'

export const metadata = {
	title: 'Problem',
	description: '',
}

export default function slug() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src='/svgs/logo.svg' />
				<GoogleSignInButton />
			</div>
			<ProblemNoClick />
		</div>
	)
}
