'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './slug.module.css'
import { GoogleSignInButton, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import { Editor } from '@monaco-editor/react'
import { useRouter, useParams } from 'next/navigation'

export default function Slug() {
	const [feature, setFeature] = useState(0)
	const router = useRouter()
	const params = useParams()
	const editorRef = useRef(null)

	const [code, setCode] = useState('')
	const [duration, setDuration] = useState('00:23:12')
	const [note, setNote] = useState('Test note')
	const [language, setLanguage] = useState('Python')

	useEffect(() => {}, [])

	async function handleSubmit() {
		const date = new Date()
		const correctDateFormat =
			date.getDate() +
			'/' +
			date.getMonth() +
			'/' +
			date.getFullYear() +
			'-' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds()

		const res = await fetch('http://localhost:3000/api/problem', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_email: 'user2@example.com',
				slug: params.slug,
				date: correctDateFormat,
				duration: duration,
				note: note,
				code: code,
				language: language,
			}),
		})
		await res.json()
	}

	function handleEditorDidMount(editor) {
		editorRef.current = editor
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
				<GoogleSignInButton />
			</div>
			<ProblemNoClick />
			<div className={styles.wrapper}>
				<Editor
					width='calc(100vw - 550px)'
					height='calc(100vh - 260px)'
					theme='vs-dark'
					className={styles.editor}
					onChange={() => setCode(editorRef.current.getValue())}
					onMount={handleEditorDidMount}
					defaultValue='hello'
					defaultLanguage='python3'
				/>
				<div className={styles.features}>
					<div className={styles.topWrapper}>
						<div className={styles.toggleWrapper}>
							<div className={styles.linksWrapper}>
								<div
									className={styles.toggle}
									style={{ borderBottom: feature ? '4px solid #b235ff' : '' }}
									onClick={() => setFeature(1)}
								>
									Stopwatch
								</div>
								<div
									className={styles.toggle}
									style={{ borderBottom: feature ? '' : '4px solid #b235ff', marginLeft: '24px' }}
									onClick={() => setFeature(0)}
								>
									Notes
								</div>
							</div>
							<div
								className={styles.submissions}
								onClick={() => router.push(pathname + '/history')}
							>
								Submissions
								<img src='/svgs/arrow-up-right.svg' />
							</div>
						</div>
						<div className={styles.feature}>
							{feature ? (
								<div className={styles.stopwatch}>
									<Stopwatch />
								</div>
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
					<SubmitButton func={handleSubmit} />
				</div>
			</div>
		</div>
	)
}

function Stopwatch() {
	return <div className={styles.stopwatchContainer}>{elapsedFormatted}</div>
}
