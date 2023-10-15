import React from 'react'
import styles from './submission.module.css'

export default function Submission({ number, date, time }) {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.position}>{number}</div>
				<div className={styles.name}>2023/10/9 - 12:27</div>
			</div>
			<div className={styles.rightWrapper}>
				<div className={styles.problemsDoneWrapper}>
					<img src='/svgs/problems-done.svg' />
					24:36
				</div>
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}
