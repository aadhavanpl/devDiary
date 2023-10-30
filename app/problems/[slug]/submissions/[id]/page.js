'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../slug.module.css'
import { GoogleSignInButton, SignedIn } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import { Editor } from '@monaco-editor/react'
import { useRouter, useParams } from 'next/navigation'
import { useGlobalContext } from '@/lib/utils/globalContext'
import Link from 'next/link'

export default function SubmissionSlug() {
	const [feature, setFeature] = useState(0)
	const router = useRouter()
	const params = useParams()
	const editorRef = useRef(null)
	const { user } = useGlobalContext()

	const [duration, setDuration] = useState('00:23:12')
	const [note, setNote] = useState('Test note')
	const [language, setLanguage] = useState('Python')

	function handleEditorDidMount(editor) {
		editorRef.current = editor
	}

	useEffect(() => {
		if (!user) return
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
			const data = await res.json()
			setCurrProblem(data)
		}
		fetchSubmission()
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
			<div className={styles.wrapper}>
				<Editor
					width='calc(100vw - 550px)'
					height='calc(100vh - 260px)'
					theme='vs-dark'
					className={styles.editor}
					onMount={handleEditorDidMount}
					defaultValue='hello'
					language={language}
					options={{ domReadOnly: true, readOnly: true }}
				/>
				<div className={styles.features}>
					<LanguageSelector />
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
										defaultValue='hello world'
										placeholder='Enter your notes here'
										disabled
									></textarea>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function Stopwatch() {
	return <div className={styles.stopwatchContainer}>{elapsedFormatted}</div>
}

function LanguageSelector() {
	return (
		<div className={styles.selectWrapper}>
			Language:
			<select
				className={styles.selectBox}
				defaultValue='python'
				onChange={(e) => setLanguage(e.target.value)}
				disabled
			>
				<option value='python'>Python</option>
				<option value='cpp'>C++</option>
				<option value='c'>C</option>
				<option value='javascript'>JavaScript</option>
				<option value='typescript'>TypeScript</option>
				<option value='java'>Java</option>
				<option value='sql'>SQL</option>
				<option value='ruby'>Ruby</option>
				<option value='php'>PHP</option>
				<option value='go'>Go</option>
				<option value='rust'>Rust</option>
				<option value='swift'>Swift</option>
				<option value='powershell'>PowerShell</option>
				<option value='perl'>Perl</option>
				<option value='kotlin'>Kotlin</option>
				<option value='json'>JSON</option>
				<option value='xml'>XML</option>
				<option value='markdown'>Markdown</option>
				<option value='yaml'>YAML</option>
				<option value='dockerfile'>Dockerfile</option>
				<option value='shell'>Shell Script</option>
				<option value='html'>HTML</option>
				<option value='css'>CSS</option>
				<option value='r'>R</option>
				<option value='scala'>Scala</option>
				<option value='perl6'>Perl 6</option>
				<option value='groovy'>Groovy</option>
				<option value='lua'>Lua</option>
				<option value='matlab'>Matlab</option>
				<option value='fortran'>Fortran</option>
			</select>
		</div>
	)
}
