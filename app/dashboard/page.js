import PageHeader from '@/components/common/PageHeader'
import styles from './dashboard.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import StatCard from '@/components/common/StatCard'

export default function dashboard() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='dashboard' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.card}>
					<StatCard icon='/svgs/problems.svg' value='207' description='Problems solved' />
					<StatCard icon='/svgs/leaderboard.svg' value='8th' description='Leaderboard' />
					<StatCard icon='/svgs/clock.svg' value='8h 36m' description='Time spent' />
				</div>
			</NavbarLayout>
		</div>
	)
}
