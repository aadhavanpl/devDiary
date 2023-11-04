'use client'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import { GoogleSignInButton, SignedIn } from '@/app/components/Button'
import { SmallProblem } from '@/app/components/Problem'
import { HomeSearchBar } from '@/app/components/SearchBar'

import styles from './page.module.css'

export default function Home() {
	const [problems, setProblems] = useState()
	const [allProblems, setAllProblems] = useState()
	const [search, setSearch] = useState('')
	const { user, signIn } = useGlobalContext()
	const router = useRouter()

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
		if (search != '' && problems?.length > 0) {
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
			<img src='/svgs/logo.svg' className={styles.logo} alt='logo' />
			<div className={search ? styles.containerWithSearch : styles.containerWithoutSearch}>
				<HomeSearchBar search={search} setSearch={setSearch} />
				{search && <div className={styles.inputBorder}></div>}
				{search && (
					<div className={styles.problemsContainer}>
						{problems?.slice(0, 3).map((problem, index) => (
							<SmallProblem
								qno={problem?.qno}
								title={problem?.title}
								slug={problem?.slug}
								tags={problem?.tags}
								difficulty={problem?.difficulty}
								key={index}
								user={user}
								signIn={signIn}
								router={router}
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
