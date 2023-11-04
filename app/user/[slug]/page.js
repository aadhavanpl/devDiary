'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { useGlobalContext } from '@/lib/utils/globalContext'
import { UserPageHeader } from '@/app/components/PageHeader'
import NavbarLayout from '@/app/components/NavbarLayout'
import StatCard from '@/app/components/StatCard'
import SubHeading from '@/app/components/SubHeading'
import Chart from '@/app/components/Chart'
import Solutions from '@/app/components/Solutions'
import Loader from '@/app/components/Loader'

import styles from './user.module.css'

export default function Slug() {
	const [loader, setLoader] = useState(true)
	const [solutions, setSolutions] = useState()
	const [problemCount, setProblemCount] = useState()
	const [duration, setDuration] = useState()
	const [chartData, setChartData] = useState()
	const [position, setPosition] = useState()
	const { user } = useGlobalContext()
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const params = useParams()

	useEffect(() => {
		if (params.slug) {
			async function fetchUserInfo() {
				const res = await fetch('https://www.devdiary.live/api/fetchUser', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: params.slug,
					}),
				})
				const data = await res.json()
				setEmail(data.tempUsers.user_email)
				setName(data.tempUsers.user_name)
			}
			fetchUserInfo()
		}
	}, [params])

	useEffect(() => {
		if (email) {
			async function fetchCountProblems() {
				const res = await fetch('https://www.devdiary.live/api/countProblems', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: email,
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
				const res = await fetch('https://www.devdiary.live/api/fetchDurations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: email,
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
					console.log(totalSeconds)
					const [hours, minutes] = secondsToHoursMinutes(totalSeconds)
					setDuration(`${hours}h ${minutes}m`)
				}
			}
			fetchDurations()

			async function fetchChartValues() {
				const res = await fetch('https://www.devdiary.live/api/fetchChart', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: email,
					}),
				})
				const data = await res.json()
				setChartData(data.countProblems)
			}
			fetchChartValues()

			async function fetchParticipants() {
				const res = await fetch('https://www.devdiary.live/api/leaderboards', { cache: 'no-store' })
				const problems = await res.json()

				for (let i = 0; i < problems.leaderboardsAPI.length; i++) {
					if (problems.leaderboardsAPI[i].user_email == email) {
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
	}, [email])

	return (
		<div className={styles.container}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<UserPageHeader name={name ? name : null} desc='Stalk your friends :)' />
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
