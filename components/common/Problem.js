import React from 'react'
import styles from './problem.module.css'
import { SmallTag } from './Tag'
import { BigDifficulty, LongDifficulty, SmallDifficulty } from './Difficulty'

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

export function BigProblem({ qno, title, tags, difficulty }) {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.problemNumber}>{qno}</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{title}</div>
					<div className={styles.tagsWrapper}>
						{tags.length &&
							tags?.map((tag, index) => <SmallTag tag={tag} color='#FCB0BD' key={index} />)}
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<img src='/svgs/done.svg' />
				<img src='/svgs/bookmark-empty.svg' />
				<img src='/svgs/bookmarked.svg' />
				<LongDifficulty difficulty={difficulty} />
				<img src='/svgs/arrow-right.svg' />
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
