'use client'
import React, { useEffect, useState } from 'react'

import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import SubHeading from '@/components/common/SubHeading'
import Participant from '@/components/common/Participant'

import styles from './leaderboard.module.css'

export default function Leaderboards() {
	const [participants, setParticipants] = useState()

	useEffect(() => {
		async function fetchParticipants() {
			const res = await fetch('http://localhost:3000/api/leaderboards')
			const problems = await res.json()
			setParticipants(problems.leaderboardsAPI)
		}
		fetchParticipants()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout>
				<PageHeader heading='leaderboards' desc='How you compete against others' />
				<SubHeading subheading='Participants' />
				<div className={styles.participants}>
					{participants?.map((participant, index) => (
						<Participant
							position={index + 1}
							name={participant.user_name}
							problems={participant.problems}
							key={index}
						/>
					))}
				</div>
			</NavbarLayout>
		</div>
	)
}
