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

export function BigProblem({ qno, title, slug, tags, done = 0, difficulty }) {
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
					{done ? <img src='/svgs/done.svg' alt='done' /> : null}
					<LongDifficulty difficulty={difficulty} />
					<img src='/svgs/arrow-right.svg' alt='arrow' />
				</div>
			</div>
		</Link>
	)
}

export function ProblemNoClick({ data, done, bookmark }) {
	const [localBookmark, setLocalBookmark] = useState()
	const [bookmarkChange, setBookmarkChange] = useState(0)
	const { user } = useGlobalContext()

	function handleBookmarkClick() {
		if (localBookmark == 1) setLocalBookmark(0)
		else setLocalBookmark(1)
		setBookmarkChange(1)
	}

	useEffect(() => {
		setLocalBookmark(bookmark)
	}, [bookmark])

	useEffect(() => {
		if (bookmarkChange) {
			async function handleBookmark() {
				const bookmarkRes = await fetch('http://localhost:3000/api/bookmark', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						status: done,
						user_email: user?.user_email,
						qno: data.qno,
						slug: data.slug,
						title: data.title,
						tags: data.tags,
						difficulty: data.difficulty,
						bookmark: localBookmark,
					}),
				})
				setBookmarkChange(0)
			}
			handleBookmark()
		}
	}, [bookmarkChange])

	return (
		<div className={styles.containerNoClick}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{data?.qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{data?.title}</div>
					<div className={styles.tagsWrapper}>
						{data?.tags?.map((tag, index) => (
							<SmallTag tag={tag} color='#FCB0BD' key={index} />
						))}
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				{done && <img src='/svgs/done.svg' alt='tick' />}
				{localBookmark ? (
					<img
						src='/svgs/bookmarked.svg'
						style={{ cursor: 'pointer' }}
						onClick={() => handleBookmarkClick()}
						alt='bookmark'
					/>
				) : (
					<img
						src='/svgs/bookmark-empty.svg'
						style={{ cursor: 'pointer' }}
						onClick={() => handleBookmarkClick()}
						alt='bookmark'
					/>
				)}
				<LongDifficulty difficulty={data?.difficulty} />
			</div>
		</div>
	)
}
