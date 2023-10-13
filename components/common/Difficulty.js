import React from 'react'
import styles from './difficulty.module.css'

export default function SmallDifficulty({ difficulty }) {
	return <div className={`${styles.smallDifficulty} ${styles[difficulty]}`}>{difficulty}</div>
}

export function BigDifficulty({ difficulty }) {
	return <div className={`${styles.bigDifficulty} ${styles[difficulty]}`}>{difficulty}</div>
}

export function LongDifficulty({ difficulty }) {
	return <div className={`${styles.longDifficulty} ${styles[difficulty]}`}>{difficulty}</div>
}
