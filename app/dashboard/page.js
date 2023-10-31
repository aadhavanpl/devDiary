'use client'
import PageHeader from '@/components/common/PageHeader'
import styles from './dashboard.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import StatCard from '@/components/common/StatCard'
import SubHeading from '@/components/common/SubHeading'
import Chart from '@/components/common/Chart'
import Solutions from '@/components/common/Solutions'
import { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import { useGlobalContext } from '@/lib/utils/globalContext'

export default function Dashboard() {
	const [loader, setLoader] = useState(true)
	const { user } = useGlobalContext()
	const [solutions, setSolutions] = useState()
	const [problemCount, setProblemCount] = useState()
	const [duration, setDuration] = useState()
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
				const totalSeconds = data.tempUsers[0].durations.reduce((total, time) => total + time, 0)
				const [hours, minutes] = secondsToHoursMinutes(totalSeconds)
				setDuration(`${hours}h ${minutes}m`)
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
				console.log(data.countProblems[0])
				setChartData(data.countProblems)
			}
			fetchChartValues()

			async function fetchParticipants() {
				const res = await fetch('http://localhost:3000/api/leaderboards')
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
