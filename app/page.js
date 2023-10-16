'use client'
import styles from './page.module.css'
import { GoogleSignInButton } from '@/components/common/Button'
import { SmallProblem } from '@/components/common/Problem'
import { useEffect, useState } from 'react'

export default function Home() {
	const [problems, setProblems] = useState()
	const [search, setSearch] = useState(false)
	const [noResult, setNoResult] = useState(false)

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/problems')
			const problems = await res.json()
			console.log(problems.problemsAPI)
			setProblems(problems.problemsAPI)
		}
		fetchProblems()
	}, [])

	return (
		<main className={styles.main}>
			<picture>
				<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
			</picture>
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<div className={styles.inputWrapper}>
					<img src='/svgs/search.svg' alt='search' />
					<input placeholder='Search a leetcode problem' />
					<img src='/svgs/x.svg' alt='close' />
				</div>
				{search && <div className={styles.inputBorder}></div>}
				{search && (
					<>
						{noResult ? (
							<div className={styles.noProblemsContainer}>
								<picture>
									<img src='/svgs/sad.svg' alt='no-result' />
								</picture>
								No result found!
							</div>
						) : (
							<div className={styles.problemsContainer}>
								{problems?.map((problem, index) => (
									<SmallProblem
										qno={problem?.qno}
										title={problem?.title}
										tags={problem?.tags}
										difficulty={problem?.difficulty}
										key={index}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
			<div className={styles.googleSignIn}>
				<GoogleSignInButton />
			</div>
		</main>
	)
}
