'use client'
import React, { useEffect, useState } from 'react'
import styles from './solutions.module.css'

export default function Solutions() {
	const [widths, setWidths] = useState()

	useEffect(() => {
		const width = window.innerWidth - 488
		const data = [114, 120, 5]
		const sum = data.reduce((a, b) => a + b, 0)
		let widths = [(data[0] / sum) * width, (data[1] / sum) * width, (data[2] / sum) * width]
		setWidths(widths)
		console.log(sum, widths)
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{widths ? (
					<>
						<div className={styles.easy} style={{ width: widths[0] }}></div>
						<div className={styles.medium} style={{ width: widths[1] }}></div>
						<div className={styles.hard} style={{ width: widths[2] }}></div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
