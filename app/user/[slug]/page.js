'use client'
import { UserPageHeader } from '@/components/common/PageHeader'
import styles from './user.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import StatCard from '@/components/common/StatCard'
import SubHeading from '@/components/common/SubHeading'
import Chart from '@/components/common/Chart'
import Solutions from '@/components/common/Solutions'
import { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import { useParams } from 'next/navigation'
import { useGlobalContext } from '@/lib/utils/globalContext'

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
				const res = await fetch('https://devdiary.live/api/fetchUser', {
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
				const res = await fetch('https://devdiary.live/api/countProblems', {
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
				const res = await fetch('https://devdiary.live/api/fetchDurations', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						user_email: email,
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
				const res = await fetch('https://devdiary.live/api/fetchChart', {
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
				const res = await fetch('https://devdiary.live/api/leaderboards')
				const problems = await res.json()

				for (let i = 0; i < problems.leaderboardsAPI.length; i++) {
					if (problems.leaderboardsAPI[i].user_email == email) {
						const getOrdinal = (n) => {
							const s = ['th', 'st', 'nd', 'rd']
							const v = n % 100
							return n + (s[(v - 20) % 10] || s[v] || s[0])
						}
						setPosition(getOrdinal(i + 1))
						setName(problems.leaderboardsAPI[i].user_name)
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
