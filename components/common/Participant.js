import React from 'react'
import styles from './participant.module.css'

export default function Participant({ position, name, problems }) {
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.position}>
					{position == 1 ? (
						<img src='/svgs/pos-1.svg' />
					) : position == 2 ? (
						<img src='/svgs/pos-2.svg' />
					) : position == 3 ? (
						<img src='/svgs/pos-3.svg' />
					) : (
						position
					)}
				</div>
				<div className={styles.name}>Aadhavan</div>
			</div>
			<div className={styles.rightWrapper}>
				<div className={styles.problemsDoneWrapper}>
					<img src='/svgs/problems-done.svg' />
					123
				</div>
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
	)
}

export function Submission({ number, date, time }) {
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
