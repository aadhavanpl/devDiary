'use client'
import PageHeader from '@/components/common/PageHeader'
import styles from './problems.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import { SearchBar } from '@/components/common/SearchBar'
import { BigDifficulty } from '@/components/common/Difficulty'
import { BigTag } from '@/components/common/Tag'
import { BigProblem } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export default function Problems() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const [easyFilter, setEasyFilter] = useState(false)
	const [mediumFilter, setMediumFilter] = useState(false)
	const [hardFilter, setHardFilter] = useState(false)

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		threshold: 1,
	}

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/problems')
			const problems = await res.json()
			setProblems(problems.problemsAPI)
			setAllProblems(problems.problemsAPI)
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
				<PageHeader heading='problems' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.searchWrapper}>
					<SearchBar setSearch={setSearch} search={search} />
					<div className={styles.difficultyWrapper}>
						<BigDifficulty difficulty='E' filter={easyFilter} setFilter={setEasyFilter} />
						<BigDifficulty difficulty='M' filter={mediumFilter} setFilter={setMediumFilter} />
						<BigDifficulty difficulty='H' filter={hardFilter} setFilter={setHardFilter} />
					</div>
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						{problems?.slice(0, 100).map((problem, index) => (
							<BigProblem
								qno={problem?.qno}
								title={problem?.title}
								tags={problem?.tags}
								difficulty={problem?.difficulty}
								key={index}
							/>
						))}
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
