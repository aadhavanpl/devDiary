import React from 'react'
import styles from './submission.module.css'

export default function Submission({ number, date, duration }) {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.position}>{number}</div>
				<div className={styles.name}>{date}</div>
			</div>
			<div className={styles.rightWrapper}>
				<div className={styles.problemsDoneWrapper}>
					<img src='/svgs/problems-done.svg' />
					{duration}
				</div>
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}
