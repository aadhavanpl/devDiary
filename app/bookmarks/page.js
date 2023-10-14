import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import SearchBar from '@/components/common/SearchBar'
import SubHeading from '@/components/common/SubHeading'
import React from 'react'
import styles from './bookmarks.module.css'

export default function bookmarks() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='bookmarks' desc='Bookmarked questions' />
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
