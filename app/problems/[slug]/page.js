'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './slug.module.css'
import {
	GoogleSignInButton,
	SignedIn,
	SubmitButton,
	UserNameChangeSubmit,
} from '@/components/common/Button'
import { ProblemNoClick } from '@/components/common/Problem'
import { Editor } from '@monaco-editor/react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGlobalContext } from '@/lib/utils/globalContext'
import Loader from '@/components/common/Loader'

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
	const [userProblemDetails, setUserProblemDetails] = useState('')
	const [completionStatus, setCompletionStatus] = useState(false)
	const [bookmark, setBookmark] = useState(0)
	const [loader, setLoader] = useState(true)

	const [stopwatchRunning, setStopwatchRunning] = useState(false)

	const location = usePathname()
	const slugg = location.slice(10)

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
				user_email: user?.user_email,
				slug: params.slug,
				date: correctDateFormat,
				duration: duration,
				note: notes,
				code: code,
				language: language,
			}),
		})
		await res.json()
	}

	useEffect(() => {
		async function fetchProblemDetails() {
			const res = await fetch('http://localhost:3000/api/fetchProblem', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: slugg,
				}),
			})
			const data = await res.json()
			setCurrProblem(data.tempProblems[0])
		}
		fetchProblemDetails()

		async function fetchUserProblemDetails() {
			const res = await fetch('http://localhost:3000/api/fetchUserProblemDetails', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
					slug: slugg,
				}),
			})
			const tempData = await res.json()
			const data = tempData.userProblems[0].problems
			if (data) {
				setUserProblemDetails(data)
				if (data.submissions.length) {
					setCompletionStatus(true)
					setBookmark(data.bookmark)
				}
			} else setUserProblemDetails(null)
		}
		fetchUserProblemDetails()
		setLoader(false)
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
					defaultValue='hello = "value"'
					language={language}
					options={{
						fontSize: 16,
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
								<div className={styles.stopwatch}>
									<Stopwatch
										time={time}
										running={stopwatchRunning}
										startStopwatch={startStopwatch}
										resetStopwatch={resetStopwatch}
									/>
								</div>
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

function Stopwatch({ time, running, startStopwatch, resetStopwatch }) {
	const secondDeg = (time % 60) * 6
	const minuteDeg = ((time / 60) % 60) * 6
	const hourDeg = ((time / 3600) % 12) * 30

	const formattedTime = new Date(time * 1000).toISOString().substr(11, 8)

	return (
		<div className={styles.clockContainer}>
			<div className={styles.analog}>
				<svg width='150' height='150'>
					<circle cx='75' cy='75' r='65' fill='none' strokeWidth='3' stroke='black' />
					<line
						x1='75'
						y1='75'
						x2='75'
						y2='15'
						strokeWidth='3'
						stroke='black'
						transform={`rotate(${hourDeg}, 75, 75)`}
					/>
					<line
						x1='75'
						y1='75'
						x2='75'
						y2='25'
						strokeWidth='1.5'
						stroke='black'
						transform={`rotate(${minuteDeg}, 75, 75)`}
					/>
					<line
						x1='75'
						y1='75'
						x2='75'
						y2='35'
						stroke='red'
						transform={`rotate(${secondDeg}, 75, 75)`}
					/>
				</svg>
			</div>
			<div className={styles.digital}>{formattedTime}</div>
			<div className={styles.clockButtons}>
				<UserNameChangeSubmit
					onClick={startStopwatch}
					title={running ? 'Pause' : 'Start'}
					svg={running ? '/svgs/pause.svg' : '/svgs/play.svg'}
				/>
				<UserNameChangeSubmit onClick={resetStopwatch} title='Reset' svg='/svgs/reset.svg' />
			</div>
		</div>
	)
}

function LanguageSelector({ language, setLanguage }) {
	return (
		<div className={styles.selectWrapper}>
			Language:
			<select
				className={styles.selectBox}
				defaultValue={language}
				onChange={(e) => setLanguage(e.target.value)}
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
