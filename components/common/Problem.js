/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './problem.module.css'
import { SmallTag } from './Tag'
import { LongDifficulty, SmallDifficulty } from './Difficulty'
import { useGlobalContext } from '@/lib/utils/globalContext'
import Link from 'next/link'

export function SmallProblem({ qno, title, slug, tags, difficulty, border, user, signIn, router }) {
	async function handleClick() {
		if (!user) await signIn()
		router.push(`/problems/${slug}`)
	}

	return (
		<div
			className={styles.container}
			style={border ? { borderBottom: 'var(--border)' } : null}
			onClick={handleClick}
		>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{title}</div>
					<div className={styles.tagsWrapper}>
						{tags[0]?.length > 0 &&
							tags?.map((tag, index) => <SmallTag tag={tag} color='#FCB0BD' key={index} />)}
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<SmallDifficulty difficulty={difficulty} />
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}

export function BigProblem({ qno, title, slug, tags, difficulty, bookmark }) {
	const [bookmarkk, setBookmark] = useState(bookmark)
	const [change, setChange] = useState(0)
	const { user } = useGlobalContext()

	useEffect(() => {
		if (change) {
			async function setBookmark() {
				const res = await fetch('http://localhost:3000/api/bookmark', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ user_email: user?.user_email, qno: qno, bookmark: bookmarkk }),
				})
				await res.json()
				setChange(0)
			}
			setBookmark()
		}
	}, [bookmarkk])

	return (
		<Link href={'/problems/' + slug}>
			<div className={styles.container} style={{ borderBottom: 'var(--border)' }}>
				<div className={styles.leftWrapper}>
					<div className={styles.problemNumber}>{qno}</div>
					<div className={styles.titleWrapper}>
						<div className={styles.bigTitle}>{title}</div>
						<div className={styles.bigTagsWrapper}>
							{tags?.length > 0 &&
								tags?.map((tag, index) => <SmallTag tag={tag} color='#FCB0BD' key={index} />)}
						</div>
					</div>
				</div>
				<div className={styles.rightWrapper}>
					<img src='/svgs/done.svg' alt='done' />
					{bookmarkk ? (
						<img
							src='/svgs/bookmarked.svg'
							onClick={() => {
								setBookmark(!bookmarkk)
								setChange(1)
							}}
							alt='bookmark'
						/>
					) : (
						<img
							src='/svgs/bookmark-empty.svg'
							onClick={() => {
								setBookmark(!bookmarkk)
								setChange(1)
							}}
							alt='no-bookmark'
						/>
					)}
					<LongDifficulty difficulty={difficulty} />
					<img src='/svgs/arrow-right.svg' alt='arrow' />
				</div>
			</div>
		</Link>
	)
}

export function ProblemNoClick({ data }) {
	return (
		<div className={styles.containerNoClick}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{data.qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{data.title}</div>
					<div className={styles.tagsWrapper}>
						{data.tags?.map((tag, index) => (
							<SmallTag tag={tag} color='#FCB0BD' key={index} />
						))}
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<img src='/svgs/done.svg' />
				<img src='/svgs/bookmarked.svg' />
				<LongDifficulty difficulty={data.difficulty} />
			</div>
		</div>
	)
}
