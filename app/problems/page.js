import PageHeader from '@/components/common/PageHeader'
import styles from './problems.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import SearchBar from '@/components/common/SearchBar'
import { BigDifficulty } from '@/components/common/Difficulty'

export default function problems() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='problems' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.searchWrapper}>
					<SearchBar />
					<div className={styles.difficultyWrapper}>
						<BigDifficulty difficulty='E' />
						<BigDifficulty difficulty='M' />
						<BigDifficulty difficulty='H' />
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
