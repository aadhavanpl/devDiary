'use client'
import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import { RandomButton } from '@/app/components/Button'
import NavbarLayout from '@/app/components/NavbarLayout'
import PageHeader from '@/app/components/PageHeader'
import { BigProblem } from '@/app/components/Problem'
import { SearchBar } from '@/app/components/SearchBar'
import ScrollButton from '@/app/components/ScrollButton'
import Loader from '@/app/components/Loader'
import SubHeading from '@/app/components/SubHeading'

import styles from './archive.module.css'

export default function Archive() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const [loader, setLoader] = useState(true)
	const { user } = useGlobalContext()
	const [random, setRandom] = useState()
	const router = useRouter()

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		shouldSort: true,
		threshold: 1,
	}

	useEffect(() => {
		if (random) router.push('/problems/' + problems[random]?.slug)
	}, [random])

	useEffect(() => {
		if (!user || user.length) return
		async function fetchProblems() {
			const archiveRes = await fetch('https://www.devdiary.live/api/fetchCompletedQno', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: user?.user_email }),
			})
			const archiveProblems = await archiveRes.json()

			const res = await fetch('https://www.devdiary.live/api/archive', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: user?.user_email }),
			})
			const problems = await res.json()

			let problemsWithCompletion = []
			for (let i = 0; i < problems.archiveAPI[0]?.problems.length; i++) {
				if (archiveProblems.archiveAPI[0]?.qno.includes(problems.archiveAPI[0].problems[i].qno))
					problems.archiveAPI[0].problems[i].done = 1
				problemsWithCompletion.push(problems.archiveAPI[0].problems[i])
			}

			setProblems(problemsWithCompletion)
			setAllProblems(problemsWithCompletion)
			setLoader(false)
		}
		fetchProblems()
	}, [user])

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
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='archive' desc='Questions that you have done before' />
				<div className={styles.searchWrapper}>
					<SearchBar search={search} setSearch={setSearch} />
					<RandomButton size={problems?.length} setRandom={setRandom} />
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						{problems?.map((problem, index) => (
							<BigProblem
								qno={problem.qno}
								title={problem.title}
								tags={problem.tags}
								slug={problem.slug}
								difficulty={problem.difficulty}
								bookmark={problem.bookmark}
								key={index}
								done={1}
							/>
						))}
					</div>
				</div>
				<ScrollButton />
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
