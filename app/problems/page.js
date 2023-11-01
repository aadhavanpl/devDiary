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
import { useGlobalContext } from '@/lib/utils/globalContext'
import { RandomButton } from '@/components/common/Button'

export default function Problems() {
	const { user } = useGlobalContext()

	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const [loader, setLoader] = useState(true)
	const [random, setRandom] = useState()
	const [archiveProblems, setArchiveProblems] = useState()

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		shouldSort: true,
		threshold: 1,
	}

	useEffect(() => {
		if (!user || user.length) return

		async function fetchProblems() {
			const archiveRes = await fetch('http://localhost:3000/api/fetchCompletedQno', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: user?.user_email }),
			})
			const archiveProblems = await archiveRes.json()

			const res = await fetch('http://localhost:3000/api/problems')
			const problems = await res.json()

			let problemsWithCompletion = []
			for (let i = 0; i < problems.problemsAPI.length; i++) {
				if (archiveProblems.archiveAPI[0].qno.includes(problems.problemsAPI[i].qno))
					problems.problemsAPI[i].done = 1
				problemsWithCompletion.push(problems.problemsAPI[i])
			}
			setProblems(problemsWithCompletion)
			setAllProblems(problemsWithCompletion)
		}
		fetchProblems()
		setLoader(false)
	}, [user])

	useEffect(() => {
		if (search != '') {
			let fuseInstance = new Fuse(problems, fuseOptions)
			const res = fuseInstance.search(search)
			let searchedProblems = []
			for (let i = 0; i < res.length; i++) searchedProblems.push(res[i].item)
			setProblems(searchedProblems)
		}
		if (search == '') setProblems(allProblems)
	}, [search])

	return (
		<div className={styles.container}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='problems' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.searchWrapper}>
					<SearchBar setSearch={setSearch} search={search} />
					<RandomButton size={problems?.length} setRandom={setRandom} />
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						{problems?.slice(0, 100).map((problem, index) => (
							<BigProblem
								qno={problem?.qno}
								title={problem?.title}
								tags={problem?.tags}
								slug={problem?.slug}
								done={problem?.done}
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
