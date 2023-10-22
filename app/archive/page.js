'use client'
import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import { SearchBar } from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styles from './archive.module.css'

export default function Archive() {
	const [problems, setProblems] = useState()

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/archive', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: 'user2@example.com' }),
			})
			const problems = await res.json()
			setProblems(problems.archiveAPI[0].problems)
		}
		fetchProblems()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='archive' desc='Questions that you have done before' />
				<div className={styles.searchWrapper}>
					<SearchBar />
					<RandomButton />
				</div>
				<div className={styles.problems}>
					{problems?.map((problem, index) => (
						<BigProblem
							qno={problem.qno}
							title={problem.title}
							tags={problem.tags}
							difficulty={problem.difficulty}
							bookmark={problem.bookmark}
							key={index}
						/>
					))}
				</div>
			</NavbarLayout>
		</div>
	)
}
