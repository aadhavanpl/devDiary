'use client'
import styles from './page.module.css'
import { Montserrat } from '@next/font/google'
import GoogleSignIn from '@/components/buttons/GoogleSignIn'
import { useState } from 'react'
import Question from '@/components/Search/Question'
const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

export default function Home() {
	const [search, setSearch] = useState(true)
	const [noResult, setNoResult] = useState(false)

	return (
		<main className={styles.main} style={montserrat.style}>
			<img src='/svgs/logo.svg' className={styles.logo} />
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<div className={styles.inputWrapper}>
					<img src='/svgs/search.svg' />
					<input className={styles.input} placeholder='Search up a leetcode question' />
					<img src='/svgs/x.svg' />
				</div>
				{search && <div className={styles.inputBorder}></div>}
				{search && (
					<>
						{noResult ? (
							<div className={styles.noQuestionsContainer}>
								<img src='/svgs/sad.svg' />
								No result found!
							</div>
						) : (
							<div className={styles.questionsContainer}>
								<Question />
								<Question />
								<Question />
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
