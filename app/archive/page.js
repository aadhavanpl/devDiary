import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import SearchBar from '@/components/common/SearchBar'
import React from 'react'
import styles from './archive.module.css'

export default function archive() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='archive' desc='Questions that you have done before' />
				<div className={styles.searchWrapper}>
					<SearchBar />
					<RandomButton />
				</div>
				<div className={styles.problems}>
					<BigProblem />
					<BigProblem />
					<BigProblem />
					<BigProblem />
				</div>
			</NavbarLayout>
		</div>
	)
}
