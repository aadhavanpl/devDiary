'use client'
import { useEffect, useState } from 'react'

import { useGlobalContext } from '@/lib/utils/globalContext'
import PageHeader from '@/app/components/PageHeader'
import NavbarLayout from '@/app/components/NavbarLayout'
import StatCard from '@/app/components/StatCard'
import SubHeading from '@/app/components/SubHeading'
import Chart from '@/app/components/Chart'
import Solutions from '@/app/components/Solutions'
import Loader from '@/app/components/Loader'

import styles from './dashboard.module.css'

export default function Dashboard() {
	const [loader, setLoader] = useState(true)
	const { user } = useGlobalContext()
	const [solutions, setSolutions] = useState()
	const [problemCount, setProblemCount] = useState()
	const [duration, setDuration] = useState(0)
	const [chartData, setChartData] = useState()
	const [position, setPosition] = useState()

	useEffect(() => {
		if (user) {
			async function fetchCountProblems() {
				const res = await fetch('http://localhost:3000/api/countProblems', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: user?.user_email,
					}),
				})
				const data = await res.json()
				setSolutions(data.countProblems)

				/* problem count */
				let count = 0
				for (let i = 0; i < data.countProblems.length; i++) count += data.countProblems[i].count
				setProblemCount(count)
			}
			fetchCountProblems()

			async function fetchDurations() {
				const res = await fetch('http://localhost:3000/api/fetchDurations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: user?.user_email,
					}),
				})
				const data = await res.json()

				/* duration */
				function secondsToHoursMinutes(seconds) {
					const hours = Math.floor(seconds / 3600)
					const minutes = Math.floor((seconds % 3600) / 60)
					return [hours, minutes]
				}
				if (data.tempUsers[0] != undefined) {
					const totalSeconds = data.tempUsers[0]?.durations.reduce(
						(total, time) => total + Number(time),
						0
					)
					const [hours, minutes] = secondsToHoursMinutes(totalSeconds)
					setDuration(`${hours}h ${minutes}m`)
				}
			}
			fetchDurations()

			async function fetchChartValues() {
				const res = await fetch('http://localhost:3000/api/fetchChart', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: user?.user_email,
					}),
				})
				const data = await res.json()
				setChartData(data.countProblems)
			}
			fetchChartValues()

			async function fetchParticipants() {
				const res = await fetch('http://localhost:3000/api/leaderboards', { cache: 'no-store' })
				const problems = await res.json()

				for (let i = 0; i < problems.leaderboardsAPI.length; i++) {
					if (problems.leaderboardsAPI[i].user_email == user?.user_email) {
						const getOrdinal = (n) => {
							const s = ['th', 'st', 'nd', 'rd']
							const v = n % 100
							return n + (s[(v - 20) % 10] || s[v] || s[0])
						}
						setPosition(getOrdinal(i + 1))
						break
					}
				}
			}
			fetchParticipants()
			setLoader(false)
		}
	}, [user])

	return (
		<div className={styles.container}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='dashboard' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.wrapper}>
					<div>
						<SubHeading subheading='Stats' />
						<div className={styles.stats}>
							<StatCard
								icon='/svgs/problems.svg'
								value={problemCount}
								description='Problems solved'
							/>
							<StatCard icon='/svgs/leaderboards.svg' value={position} description='Leaderboards' />
							<StatCard icon='/svgs/clock.svg' value={duration} description='Time spent' />
						</div>
					</div>
					<div>
						<SubHeading subheading='Solutions' />
						<Solutions solutions={solutions} />
					</div>
					<div>
						<SubHeading subheading='Progress' />
						<Chart chartData={chartData} />
					</div>
				</div>
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
