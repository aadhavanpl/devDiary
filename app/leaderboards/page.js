'use client'
import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@/lib/utils/globalContext'
import NavbarLayout from '@/app/components/NavbarLayout'
import PageHeader from '@/app/components/PageHeader'
import SubHeading from '@/app/components/SubHeading'
import Participant from '@/app/components/Participant'
import ScrollButton from '@/app/components/ScrollButton'
import Loader from '@/app/components/Loader'

import styles from './leaderboard.module.css'

export default function Leaderboards() {
	const [participants, setParticipants] = useState()
	const [loader, setLoader] = useState(true)
	const { user } = useGlobalContext()

	useEffect(() => {
		async function fetchParticipants() {
			const res = await fetch('http://localhost:3000/api/leaderboards', { cache: 'no-store' })
			const problems = await res.json()
			setParticipants(problems.leaderboardsAPI)
			setLoader(false)
		}
		fetchParticipants()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='leaderboards' desc='How you compete against others' />
				<SubHeading subheading='Participants' />
				<div className={styles.participants}>
					{participants?.map((participant, index) => (
						<Participant
							position={index + 1}
							name={participant.user_name}
							email={participant.user_email}
							id={participant._id}
							problems={participant.problemCount}
							key={index}
						/>
					))}
				</div>
				<ScrollButton />
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
