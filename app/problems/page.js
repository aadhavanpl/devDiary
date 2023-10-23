'use client'
import PageHeader from '@/components/common/PageHeader'
import styles from './problems.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import { SearchBar } from '@/components/common/SearchBar'
import ScrollButton from '@/components/common/ScrollButton'
import { BigDifficulty } from '@/components/common/Difficulty'
import { BigProblem } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import Loader from '@/components/common/Loader'

export default function Problems() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const [easyFilter, setEasyFilter] = useState(false)
	const [mediumFilter, setMediumFilter] = useState(false)
	const [hardFilter, setHardFilter] = useState(false)
	const [loader, setLoader] = useState(true)

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		shouldSort: true,
		threshold: 1,
	}

	const fuseDifficultyOptions = {
		keys: ['difficulty'],
		threshold: 1,
	}

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/problems')
			const problems = await res.json()
			setProblems(problems.problemsAPI)
			setAllProblems(problems.problemsAPI)
			setLoader(false)
		}
		fetchProblems()
	}, [])

	useEffect(() => {
		if (search != '') {
			let fuseInstance = new Fuse(problems, fuseOptions)
			const res = fuseInstance.search(search)
			let tempProblems = []
			for (let i = 0; i < res.length; i++) tempProblems.push(res[i].item)

			let easyProblems = []
			if (easyFilter) {
				let newFuseInstance = new Fuse(tempProblems, fuseDifficultyOptions)
				const easyRes = newFuseInstance.search('Easy')
				for (let i = 0; i < easyRes.length; i++) easyProblems.push(easyRes[i].item)
			}

			let mediumProblems = []
			if (mediumFilter) {
				let newFuseInstance = new Fuse(tempProblems, fuseDifficultyOptions)
				const mediumRes = newFuseInstance.search('Medium')
				for (let i = 0; i < mediumRes.length; i++) mediumProblems.push(mediumRes[i].item)
			}

			let hardProblems = []
			if (hardFilter) {
				let newFuseInstance = new Fuse(tempProblems, fuseDifficultyOptions)
				const hardRes = newFuseInstance.search('Hard')
				for (let i = 0; i < hardRes.length; i++) hardProblems.push(hardRes[i].item)
			}

			if (!easyFilter && !mediumFilter && !hardFilter) setProblems(tempProblems)
			else {
				let finalProblems = easyProblems.concat(mediumProblems, hardProblems)
				console.log('easyProblems')
				console.log(easyProblems)
				console.log('mediumProblems')
				console.log(mediumProblems)
				console.log('hardProblems')
				console.log(hardProblems)
				console.log(finalProblems)
				setProblems(finalProblems)
			}
		}
		if (search == '') setProblems(allProblems)
	}, [search, easyFilter, mediumFilter, hardFilter])

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
					<ScrollButton />
				</div>
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
