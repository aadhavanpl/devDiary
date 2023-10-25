'use client'
import styles from './page.module.css'
import { GoogleSignInButton, SignedIn } from '@/components/common/Button'
import { SmallProblem } from '@/components/common/Problem'
import { HomeSearchBar } from '@/components/common/SearchBar'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/lib/utils/globalContext'

export default function Home() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const { user } = useGlobalContext()

	const fuseOptions = {
		keys: ['qno', 'title', 'slug', 'difficulty', 'tags'],
		shouldSort: true,
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
			let fuseInstance = new Fuse(problems, fuseOptions)
			const res = fuseInstance.search(search)
			let tempProblems = []
			for (let i = 0; i < res.length; i++) tempProblems.push(res[i].item)
			setProblems(tempProblems)
		}
		if (search == '') setProblems(allProblems)
	}, [search])

	return (
		<main className={styles.main}>
			<picture>
				<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
			</picture>
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<HomeSearchBar search={search} setSearch={setSearch} />
				{search && <div className={styles.inputBorder}></div>}
				{search && (
					<div className={styles.problemsContainer}>
						{problems?.slice(0, 3).map((problem, index) => (
							<SmallProblem
								qno={problem?.qno}
								title={problem?.title}
								tags={problem?.tags}
								difficulty={problem?.difficulty}
								key={index}
							/>
						))}
					</div>
				)}
			</div>
			<div className={styles.googleSignIn}>
				{user ? <SignedIn photoURL={user?.user_photo} /> : <GoogleSignInButton />}
			</div>
		</main>
	)
}
