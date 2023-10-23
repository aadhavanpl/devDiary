'use client'
import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import { SearchBar } from '@/components/common/SearchBar'
import SubHeading from '@/components/common/SubHeading'
import React, { useEffect, useState } from 'react'
import styles from './bookmarks.module.css'
import Fuse from 'fuse.js'
import ScrollButton from '@/components/common/ScrollButton'

export default function Bookmarks() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		threshold: 1,
	}

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
			setProblems(problems.bookmarksAPI[0].problems)
			setAllProblems(problems.bookmarksAPI[0].problems)
		}
		fetchProblems()
	}, [])

	useEffect(() => {
		if (search != '') {
			const fuseInstance = new Fuse(problems, fuseOptions)
			const res = fuseInstance.search(search)
			let tempProblems = []
			for (let i = 0; i < res.length; i++) tempProblems.push(res[i].item)
			setProblems(tempProblems)
		}
		if (search == '') setProblems(allProblems)
	}, [search])

	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='bookmarks' desc='Bookmarked questions' />
				<div className={styles.searchWrapper}>
					<SearchBar search={search} setSearch={setSearch} />
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
				<ScrollButton />
			</NavbarLayout>
		</div>
	)
}
