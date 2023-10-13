'use client'
import styles from './page.module.css'
import GoogleSignIn from '@/components/buttons/GoogleSignIn'
import { useState } from 'react'
import SmallProblem from '@/components/common/Problem'

export default function Home() {
	const [search, setSearch] = useState(true)
	const [noResult, setNoResult] = useState(false)

	return (
		<main className={styles.main}>
			<img src='/svgs/logo.svg' className={styles.logo} />
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<div className={styles.inputWrapper}>
					<img src='/svgs/search.svg' />
					<input placeholder='Search up a leetcode problem' />
					<img src='/svgs/x.svg' />
				</div>
				{search && <div className={styles.inputBorder}></div>}
				{search && (
					<>
						{noResult ? (
							<div className={styles.noProblemsContainer}>
								<img src='/svgs/sad.svg' />
								No result found!
							</div>
						) : (
							<div className={styles.problemsContainer}>
								<SmallProblem />
								<SmallProblem />
								<SmallProblem />
							</div>
						)}
					</>
				)}
			</div>
			<div className={styles.googleSignIn}>
				<GoogleSignIn />
			</div>
		</main>
	)
}
