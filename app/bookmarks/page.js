'use client'
import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import { SearchBar } from '@/components/common/SearchBar'
import SubHeading from '@/components/common/SubHeading'
import React, { useEffect, useState } from 'react'
import styles from './bookmarks.module.css'

export default function Bookmarks() {
	const [problems, setProblems] = useState()

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/bookmarks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
				}),
			})
			const problems = await res.json()
			setProblems(problems.bookmarksAPI)
		}
		fetchProblems()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='bookmarks' desc='Bookmarked questions' />
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
							key={index}
						/>
					))}
				</div>
			</NavbarLayout>
		</div>
	)
}
