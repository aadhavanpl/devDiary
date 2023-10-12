import React from 'react'
import styles from './difficulty.module.css'

export default function Difficulty({ difficuty }) {
	return <div className={`${styles.container} ${styles[difficuty]}`}>{difficuty}</div>
}
