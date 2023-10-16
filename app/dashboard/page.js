import PageHeader from '@/components/common/PageHeader'
import styles from './dashboard.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import StatCard from '@/components/common/StatCard'
import SubHeading from '@/components/common/SubHeading'
import Chart from '@/components/common/Chart'
import Solutions from '@/components/common/Solutions'

export default function dashboard() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='dashboard' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.wrapper}>
					<div>
						<SubHeading subheading='Stats' />
						<div className={styles.stats}>
							<StatCard icon='/svgs/problems.svg' value='207' description='Problems solved' />
							<StatCard icon='/svgs/leaderboards.svg' value='8th' description='Leaderboards' />
							<StatCard icon='/svgs/clock.svg' value='8h 36m' description='Time spent' />
						</div>
					</div>
					<div>
						<SubHeading subheading='Solutions' />
						<Solutions />
					</div>
					<div>
						<SubHeading subheading='Progress' />
						<Chart />
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
