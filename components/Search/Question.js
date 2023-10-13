import React from 'react'
import styles from './question.module.css'
import Tag from '../common/Tag'
import SmallDifficulty from '../common/Difficulty'

export default function Question() {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.questionNumber}>512</div>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>Remove Palindromic Subsequences</div>
					<div className={styles.tagsWrapper}>
						<Tag tag='String' color='#FCB0BD' />
						<Tag tag='Array' color='#B1DCC9' />
					</div>
				</div>
			</div>
			<div className={styles.rightWrapper}>
				<SmallDifficulty difficuty='E' />
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}
