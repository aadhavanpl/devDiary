'use client'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import PageHeader from '@/app/components/PageHeader'
import NavbarLayout from '@/app/components/NavbarLayout'
import { SearchBar } from '@/app/components/SearchBar'
import ScrollButton from '@/app/components/ScrollButton'
import { BigProblem } from '@/app/components/Problem'
import Loader from '@/app/components/Loader'
import { RandomButton } from '@/app/components/Button'
import SubHeading from '@/app/components/SubHeading'

import styles from './problems.module.css'

export default function Problems() {
	const { user } = useGlobalContext()
	const router = useRouter()

	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const [loader, setLoader] = useState(true)
	const [random, setRandom] = useState()

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		shouldSort: true,
		threshold: 1,
	}

	useEffect(() => {
		if (!user || user.length) return
		async function fetchProblems() {
			const archiveRes = await fetch('https://www.devdiary.live/api/fetchCompletedQno', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: user?.user_email }),
			})
			const archiveProblems = await archiveRes.json()

			const res = await fetch('https://www.devdiary.live/api/problems')
			const problems = await res.json()

			let problemsWithCompletion = []
			for (let i = 0; i < problems.problemsAPI.length; i++) {
				if (archiveProblems.archiveAPI[0]?.qno.includes(problems.problemsAPI[i].qno))
					problems.problemsAPI[i].done = 1
				problemsWithCompletion.push(problems.problemsAPI[i])
			}
			setProblems(problemsWithCompletion)
			setAllProblems(problemsWithCompletion)
			setLoader(false)
		}
		fetchProblems()
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

	useEffect(() => {
		if (random) router.push('/problems/' + problems[random]?.slug)
	}, [random])

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
