import React from 'react'
import StatCard from '../../components/common/StatCard'
import styles from './page.module.css'
export default function Page() {
	return (
		// <div className = {styles['container']}>
		//     <img src = '/svgs/problems.svg' className={styles['icon']} />
		//     <div className = {styles['stat-container']}>
		//         <div className = {styles['value']}>207</div>
		//         <div className = {styles['description']}>Problems solved</div>
		//     </div>
		// </div>
		<div className={styles['card']}>
			<StatCard icon='/svgs/problems.svg' value='207' description='Problems solved' />
			<StatCard icon='/svgs/leaderboard.svg' value='8th' description='Leaderboard' />
			<StatCard icon='/svgs/clock.svg' value='8h 36m' description='Time spent' />
		</div>
	)
}
