import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './submission.module.css'
import '../../app/globals.css'

export default function Submission({ number, date, time, duration, pathname, id }) {
	const [localDuration, setLocalDuration] = useState()

	useEffect(() => {
		function secondsToHoursMinutes(seconds) {
			const hours = Math.floor(seconds / 3600)
			const minutes = Math.floor((seconds % 3600) / 60)
			return [hours, minutes]
		}
		const [hours, minutes] = secondsToHoursMinutes(Number(duration))
		setLocalDuration(`${hours}h ${minutes}m`)
	}, [])

	return (
		<Link href={pathname + '/' + id}>
			<div className={styles.container}>
				<div className={styles.leftWrapper}>
					<div className={styles.position}>{number}</div>
					<div className={styles.name}>
						{date} - {time}
					</div>
				</div>
				<div className={styles.rightWrapper}>
					<div className={styles.problemsDoneWrapper}>
						<img src='/svgs/time.svg' />
						{localDuration}
					</div>
					<img src='/svgs/arrow-right.svg' />
				</div>
			</div>
		</Link>
	)
}
