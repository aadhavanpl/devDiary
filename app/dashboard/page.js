import PageHeader from '@/components/common/PageHeader'
import styles from './dashboard.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'

export default function dashboard() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='dashboard' desc='Track your progress practicing Leetcode here!' />
			</NavbarLayout>
		</div>
	)
}
