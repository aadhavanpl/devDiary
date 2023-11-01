'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Editor } from '@monaco-editor/react'
import { useRouter, useParams, usePathname } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import { GoogleSignInButton, SignedIn, SubmitButton } from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import Loader from '@/components/common/Loader'
import Stopwatch from '@/components/common/Stopwatch'
import LanguageSelector from '@/components/common/LanguageSelector'

import styles from './slug.module.css'

export default function Slug() {
	const { user } = useGlobalContext()

	const router = useRouter()
	const params = useParams()
	const editorRef = useRef(null)
	const pathname = usePathname()

	const [code, setCode] = useState('')
	const [time, setTime] = useState(0)
	const [notes, setNotes] = useState('')
	const [language, setLanguage] = useState('python')
	const [feature, setFeature] = useState(1)
	const [currProblem, setCurrProblem] = useState('')
	const [completionStatus, setCompletionStatus] = useState(false)
	const [bookmark, setBookmark] = useState(0)
	const [loader, setLoader] = useState(true)

	const [stopwatchRunning, setStopwatchRunning] = useState(false)

	async function handleSubmit() {
		const date = new Date()
		const correctDateFormat =
			date.getFullYear() +
			'/' +
			(date.getMonth() + 1).toString().padStart(2, '0') +
			'/' +
			date.getDate().toString().padStart(2, '0')
		const correctTimeFormat =
			date.getHours().toString().padStart(2, '0') +
			':' +
			date.getMinutes().toString().padStart(2, '0') +
			':' +
			date.getSeconds().toString().padStart(2, '0')

		const res = await fetch('https://devdiary.live/api/problem', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_email: user?.user_email,
				qno: currProblem?.qno,
				title: currProblem?.title,
				tags: currProblem?.tags,
				slug: params.slug,
				difficulty: currProblem?.difficulty,
				date: correctDateFormat,
				time: correctTimeFormat,
				duration: time,
				note: notes,
				code: code,
				language: language,
			}),
		})

		await res.json()
		router.push(pathname + '/submissions')
	}

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
		setLoader(false)
	}, [user])

	useEffect(() => {
		localStorage.removeItem('notes')
		localStorage.removeItem('stopwatchTime')
	}, [])

	function handleEditorDidMount(editor) {
		editorRef.current = editor
	}

	function startStopwatch() {
		setStopwatchRunning(!stopwatchRunning)
	}

	function resetStopwatch() {
		setTime(0)
		setStopwatchRunning(false)
	}

	useEffect(() => {
		localStorage.setItem('stopwatchTime', time.toString())
	}, [time])

	useEffect(() => {
		const savedNotes = localStorage.getItem('notes')
		if (savedNotes) setNotes(savedNotes)
		const timeInterval = setInterval(() => {
			if (stopwatchRunning) setTime((prevTime) => prevTime + 1)
		}, 1000)
		return () => clearInterval(timeInterval)
	}, [stopwatchRunning])

	useEffect(() => {
		localStorage.setItem('notes', notes)
	}, [notes])

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
			<div className={styles.wrapper}>
				<Editor
					width='calc(100vw - 550px)'
					height='calc(100vh - 256px)'
					theme='vs-dark'
					className={styles.editor}
					onChange={() => setCode(editorRef.current.getValue())}
					onMount={handleEditorDidMount}
					defaultValue=''
					language={language}
					options={{
						fontSize: 17,
					}}
				/>
				<div className={styles.features}>
					<LanguageSelector language={language} setLanguage={setLanguage} />
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
								onClick={() => router.push(pathname + '/submissions')}
							>
								Submissions
								<img src='/svgs/arrow-up-right.svg' />
							</div>
						</div>
						<div className={styles.feature}>
							{feature ? (
								<Stopwatch
									time={time}
									running={stopwatchRunning}
									startStopwatch={startStopwatch}
									resetStopwatch={resetStopwatch}
								/>
							) : (
								<div className={styles.notes}>
									<textarea
										className={styles.textarea}
										placeholder='Enter your notes here'
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									></textarea>
								</div>
							)}
						</div>
					</div>
					<SubmitButton func={handleSubmit} />
				</div>
			</div>
			<Loader loader={loader} />
		</div>
	)
}
