import { RandomButton } from '@/components/common/Button'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import { BigProblem } from '@/components/common/Problem'
import SearchBar from '@/components/common/SearchBar'
import React from 'react'
import styles from './leaderboard.module.css'
import SubHeading from '@/components/common/SubHeading'
import Participant from '@/components/common/Participant'

export default function leaderboards() {
	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='leaderboards' desc='How you compete against others' />
				<SubHeading subheading='Participants' />
				<div className={styles.participants}>
					<Participant position={1} />
					<Participant position={2} />
					<Participant position={3} />
					<Participant position={4} />
					<Participant position={5} />
					<Participant position={6} />
				</div>
			</NavbarLayout>
		</div>
	)
}
