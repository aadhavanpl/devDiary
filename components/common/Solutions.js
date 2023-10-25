'use client'
import React, { useEffect, useState } from 'react'
import styles from './solutions.module.css'

export default function Solutions({ solutions }) {
	const [widths, setWidths] = useState()
	const [noEasy, setNoEasy] = useState(false)
	const [noMedium, setNoMedium] = useState(false)
	const [noHard, setNoHard] = useState(false)

	useEffect(() => {
		if (solutions) {
			let data = [0, 0, 0]
			for (let i = 0; i < solutions.length; i++) {
				if (solutions[i].difficulty == 'Easy') data[0] = solutions[i].count
				else if (solutions[i].difficulty == 'Medium') data[1] = solutions[i].count
				else if (solutions[i].difficulty == 'Hard') data[2] = solutions[i].count
			}

			if (data[0] == 0 || data[1] == 0 || data[2] == 0) {
				if (data[0] == 0) setNoEasy(true)
				if (data[1] == 0) setNoMedium(true)
				if (data[2] == 0) setNoHard(true)
				data[0]++
				data[1]++
				data[2]++
			}

			const width = window.innerWidth - 356
			const sum = data.reduce((a, b) => a + b, 0)
			const widths = [(data[0] / sum) * width, (data[1] / sum) * width, (data[2] / sum) * width]
			console.log(widths)
			setWidths(widths)
		}
	}, [solutions])

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{widths ? (
					<>
						<div
							className={noEasy ? styles.noEasy : styles.easy}
							style={{ width: widths[0] }}
						></div>
						<div
							className={noMedium ? styles.noMedium : styles.medium}
							style={{ width: widths[1] }}
						></div>
						<div
							className={noHard ? styles.noHard : styles.hard}
							style={{ width: widths[2] }}
						></div>
					</>
				) : null}
			</div>
		</div>
	)
}
