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

	useEffect(() => {
		async function fetchCountProblems() {
			const res = await fetch('http://localhost:3000/api/countProblems', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
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
					user_email: 'user2@example.com',
				}),
			})
			const data = await res.json()

			/* duration */
			function timeToMinutes(timeString) {
				const [hours, minutes, seconds] = timeString.split(':').map(Number)
				return hours * 60 + minutes + seconds / 60
			}
			const totalMinutes = Math.round(
				data.tempUsers[0].durations.reduce((total, duration) => {
					return total + timeToMinutes(duration)
				}, 0)
			)
			const formattedTime = `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`
			setDuration(formattedTime)
		}
		fetchDurations()

		async function fetchChartValues() {
			const res = await fetch('http://localhost:3000/api/fetchChart', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
				}),
			})
			const data = await res.json()
			console.log('chartttt', data)
		}
		fetchChartValues()
		setLoader(false)
	}, [])

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
							<StatCard icon='/svgs/leaderboards.svg' value='8th' description='Leaderboards' />
							<StatCard icon='/svgs/clock.svg' value={duration} description='Time spent' />
						</div>
					</div>
					<div>
						<SubHeading subheading='Solutions' />
						<Solutions solutions={solutions} />
					</div>
					<div>
						<SubHeading subheading='Progress' />
						<Chart />
					</div>
				</div>
			</NavbarLayout>
			<Loader loader={loader} />
		</div>
	)
}
