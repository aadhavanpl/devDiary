'use client'
import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import { SearchBar } from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styles from './bookmarks.module.css'
import Fuse from 'fuse.js'
import ScrollButton from '@/components/common/ScrollButton'
import Loader from '@/components/common/Loader'
import { useGlobalContext } from '@/lib/utils/globalContext'
import { useRouter } from 'next/navigation'
import SubHeading from '@/components/common/SubHeading'

export default function Bookmarks() {
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
			const archiveRes = await fetch('http://localhost:3000/api/fetchCompletedQno', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: user?.user_email }),
			})
			const archiveProblems = await archiveRes.json()

			const res = await fetch('http://localhost:3000/api/bookmarks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
				}),
			})
			const problems = await res.json()

			let problemsWithCompletion = []
			for (let i = 0; i < problems.bookmarksAPI.length; i++) {
				if (archiveProblems.archiveAPI[0].qno.includes(problems.bookmarksAPI[i].problems.qno))
					problems.bookmarksAPI[i].problems.done = 1
				problemsWithCompletion.push(problems.bookmarksAPI[i].problems)
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
				<PageHeader heading='bookmarks' desc='Bookmarked questions' />
				<div className={styles.searchWrapper}>
					<SearchBar search={search} setSearch={setSearch} />
					<RandomButton size={problems?.length} setRandom={setRandom} />
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						{problems?.map((problem, index) => (
							<BigProblem
								qno={problem?.qno}
								title={problem?.title}
								tags={problem?.tags}
								slug={problem?.slug}
								done={problem?.done}
								bookmark={problem?.bookmark}
								difficulty={problem?.difficulty}
								key={index}
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
