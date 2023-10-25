'use client'
import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import { SearchBar } from '@/components/common/SearchBar'
import React, { useEffect, useState } from 'react'
import styles from './archive.module.css'
import Fuse from 'fuse.js'
import ScrollButton from '@/components/common/ScrollButton'
import Loader from '@/components/common/Loader'
import { useGlobalContext } from '@/lib/utils/globalContext'
import { useRouter } from 'next/navigation'

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
		threshold: 1,
	}

	useEffect(() => {
		if (random) router.push('/problems/' + problems[random]?.slug)
	}, [random])

	useEffect(() => {
		async function fetchProblems() {
			const res = await fetch('http://localhost:3000/api/archive', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_email: 'user2@example.com' }),
			})
			const problems = await res.json()
			setProblems(problems.archiveAPI[0].problems)
			setAllProblems(problems.archiveAPI[0].problems)
			setLoader(false)
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
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='archive' desc='Questions that you have done before' />
				<div className={styles.searchWrapper}>
					<SearchBar search={search} setSearch={setSearch} />
					<RandomButton size={problems?.length} setRandom={setRandom} />
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
				<ScrollButton />
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
