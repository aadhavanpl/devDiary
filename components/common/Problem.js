/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './problem.module.css'
import { SmallTag } from './Tag'
import { LongDifficulty, SmallDifficulty } from './Difficulty'

export function SmallProblem({ qno, title, tags, difficulty }) {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{title}</div>
					<div className={styles.tagsWrapper}>
						{tags?.map((tag, index) => (
							<SmallTag tag={tag} color='#FCB0BD' key={index} />
						))}
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<SmallDifficulty difficulty='E' />
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}

export function BigProblem({ qno, title, tags, difficulty, bookmark }) {
	const [bookmarkk, setBookmark] = useState(bookmark)
	const [change, setChange] = useState(0)

	useEffect(() => {
		if (change) {
			async function setBookmark() {
				const res = await fetch('http://localhost:3000/api/bookmark', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ user_email: 'user2@example.com', qno: qno, bookmark: bookmarkk }),
				})
				await res.json()
				setChange(0)
			}
			setBookmark()
		}
	}, [bookmarkk])

	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{title}</div>
					<div className={styles.tagsWrapper}>
						{tags?.length &&
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
	)
}

export function ProblemNoClick() {
	return (
		<div className={styles.containerNoClick}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>512</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>Remove Palindromic Subsequences</div>
					<div className={styles.tagsWrapper}>
						<SmallTag tag='String' color='#FCB0BD' />
						<SmallTag tag='Array' color='#B1DCC9' />
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<LongDifficulty difficulty='Easy' />
				<img src='/svgs/done.svg' />
				<img src='/svgs/bookmark-empty.svg' />
				<img src='/svgs/bookmarked.svg' />
			</div>
		</div>
	)
}
