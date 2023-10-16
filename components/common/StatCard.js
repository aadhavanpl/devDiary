import React from 'react'
import styles from './statcard.module.css'
export default function StatCard({ icon, value, description }) {
	return (
		<div className={styles['container']}>
			<picture>
				<img src={icon} className={styles['icon']} alt='icon' />
			</picture>
			<div className={styles['stat-container']}>
				<div className={styles['value']}>{value}</div>
				<div className={styles['description']}>{description}</div>
			</div>
		</div>
	)
}
