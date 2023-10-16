'use client'
import styles from './page.module.css'
import { GoogleSignInButton } from '@/components/common/Button'
import { useState } from 'react'
import { SmallProblem } from '@/components/common/Problem'

export default function Home() {
	const [search, setSearch] = useState(true)
	const [noResult, setNoResult] = useState(false)

	return (
		<main className={styles.main}>
			<picture>
				<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
			</picture>
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<div className={styles.inputWrapper}>
					<picture>
						<img src='/svgs/search.svg' alt='search' />
					</picture>
					<input placeholder='Search up a leetcode problem' />
					<picture>
						<img src='/svgs/x.svg' alt='close' />
					</picture>
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
								<SmallProblem />
								<SmallProblem />
								<SmallProblem />
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
