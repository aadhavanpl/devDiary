'use client'
import React, { useState } from 'react'
import styles from './slug.module.css'
import { GoogleSignInButton, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import { Editor } from '@monaco-editor/react'

export default function Slug() {
	const [feature, setFeature] = useState(0)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src='/svgs/logo.svg' className={styles.logo} />
				<GoogleSignInButton />
			</div>
			<ProblemNoClick />
			<div className={styles.wrapper}>
				<Editor
					width='calc(100vw - 550px)'
					height='calc(100vh - 292px)'
					theme='vs-dark'
					className={styles.editor}
				/>
				<div className={styles.features}>
					<div className={styles.topWrapper}>
						<div className={styles.toggleWrapper}>
							<div
								className={styles.toggle}
								style={{ borderBottom: feature ? '4px solid #b235ff' : '' }}
								onClick={() => setFeature(1)}
							>
								Stopwatch
							</div>
							<div
								className={styles.toggle}
								style={{ borderBottom: feature ? '' : '4px solid #b235ff' }}
								onClick={() => setFeature(0)}
							>
								Notes
							</div>
						</div>
						<div className={styles.feature}>
							{feature ? (
								<div className={styles.stopwatch}></div>
							) : (
								<div className={styles.notes}>
									<textarea
										className={styles.textarea}
										placeholder='Enter your notes here'
										rows={10}
									></textarea>
								</div>
							)}
						</div>
					</div>
					<SubmitButton />
				</div>
			</div>
		</div>
	)
}
