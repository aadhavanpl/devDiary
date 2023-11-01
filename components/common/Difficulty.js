import styles from './difficulty.module.css'

export function SmallDifficulty({ difficulty }) {
	if (difficulty == 'Easy') difficulty = 'E'
	if (difficulty == 'Medium') difficulty = 'M'
	if (difficulty == 'Hard') difficulty = 'H'
	return <div className={`${styles.smallDifficulty} ${styles[difficulty]}`}>{difficulty}</div>
}

export function BigDifficulty({ difficulty, filter, setFilter }) {
	return (
		<div
			className={`${styles.bigDifficulty} ${filter ? styles[difficulty] : styles.unselected}`}
			onClick={() => setFilter(!filter)}
		>
			{difficulty}
		</div>
	)
}

export function LongDifficulty({ difficulty }) {
	return <div className={`${styles.longDifficulty} ${styles[difficulty]}`}>{difficulty}</div>
}
