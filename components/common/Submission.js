import React from 'react'
import styles from './submission.module.css'
import Link from 'next/link'

export default function Submission({ number, date, duration, pathname, id }) {
	return (
		<Link href={pathname + '/' + id}>
			<div className={styles.container}>
				<div className={styles.leftWrapper}>
					<div className={styles.position}>{number}</div>
					<div className={styles.name}>{date}</div>
				</div>
				<div className={styles.rightWrapper}>
					<div className={styles.problemsDoneWrapper}>
						<img src='/svgs/time.svg' />
						{duration}
					</div>
					<img src='/svgs/arrow-right.svg' />
				</div>
			</div>
		</Link>
	)
}
