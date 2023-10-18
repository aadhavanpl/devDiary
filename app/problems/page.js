'use client'
import PageHeader from '@/components/common/PageHeader'
import styles from './problems.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import SearchBar from '@/components/common/SearchBar'
import { BigDifficulty } from '@/components/common/Difficulty'
import { BigTag } from '@/components/common/Tag'
import { BigProblem } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import { useEffect, useState } from 'react'

export default function Problems() {
	const [problems, setProblems] = useState()
	const [search, setSearch] = useState('')
	const [easyFilter, setEasyFilter] = useState(false)
	const [mediumFilter, setMediumFilter] = useState(false)
	const [hardFilter, setHardFilter] = useState(false)

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/problems')
			const problems = await res.json()
			setProblems(problems.problemsAPI)
		}
		fetchProblems()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='problems' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.searchWrapper}>
					<SearchBar setSearch={setSearch} />
					<div className={styles.difficultyWrapper}>
						<BigDifficulty difficulty='E' filter={easyFilter} setFilter={setEasyFilter} />
						<BigDifficulty difficulty='M' filter={mediumFilter} setFilter={setMediumFilter} />
						<BigDifficulty difficulty='H' filter={hardFilter} setFilter={setHardFilter} />
					</div>
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						{problems
							?.filter((item) => {
								return search.toLowerCase() === ''
									? item
									: easyFilter
									? (item.difficulty.toLowerCase == 'easy' &&
											item.title.toLowerCase().includes(search)) ||
									  item.qno == search
									: null
							})
							.map((problem, index) => (
								<BigProblem
									qno={problem.qno}
									title={problem.title}
									tags={problem.tags}
									difficulty={problem.difficulty}
									key={index}
								/>
							))}
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
