import PageHeader from '@/components/common/PageHeader'
import styles from './problems.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import SearchBar from '@/components/common/SearchBar'
import { BigDifficulty } from '@/components/common/Difficulty'
import { BigTag } from '@/components/common/Tag'
import { BigProblem } from '@/components/common/Problem'
import SubHeading from '@/components/common/SubHeading'

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
				<div className={styles.tagsWrapper}>
					<SubHeading subheading='Tags' />
					<div className={styles.tags}>
						<BigTag tag='String' color='#FCB0BD' />
						<BigTag tag='Linked List' color='#C2BCE0' />
						<BigTag tag='Array' color='#B1DCC9' />
						<BigTag tag='BFS' color='#B8E6FE' />
					</div>
				</div>
				<div className={styles.problemsWrapper}>
					<SubHeading subheading='Problems' />
					<div className={styles.problems}>
						<BigProblem />
						<BigProblem />
						<BigProblem />
						<BigProblem />
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
