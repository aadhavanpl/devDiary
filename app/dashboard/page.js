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

	useEffect(() => {
		if (!user || !user?.length) return
		console.log(user[0])
	}, [user])

	// useEffect(() => {
	// 	const userData = {
	// 		user_email: 'anaghdeebbugsdkjfn@gmail.com',
	// 		user_name: 'Aadfaasdfasddasdfashavan',
	// 		user_photo: 'lmaoadsfasd@google.com',
	// 	}

	// 	const problemData = {
	// 		user_email: 'sahelnriaz@gmail.com',
	// 		qno: 12,
	// 		code: 'tempcode',
	// 	}

	// 	fetch('http://localhost:3000/api/users', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(problemData),
	// 	})
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error('Failed to add the user.')
	// 			}
	// 			return response.json()
	// 		})
	// 		.then((data) => {
	// 			console.log('User added successfully:', data)
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error)
	// 		})
	// 	setLoader(false)
	// }, [])

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
			console.log('problemmsssss', data)
			setLoader(false)
		}
		fetchCountProblems()

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
			setLoader(false)
		}
		fetchChartValues()
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout
				photoURL={user ? user[0]?.photoURL : null}
				name={user ? user[0]?.displayName : null}
			>
				<PageHeader heading='dashboard' desc='Track your progress practicing Leetcode here!' />
				<div className={styles.wrapper}>
					<div>
						<SubHeading subheading='Stats' />
						<div className={styles.stats}>
							<StatCard icon='/svgs/problems.svg' value='207' description='Problems solved' />
							<StatCard icon='/svgs/leaderboards.svg' value='8th' description='Leaderboards' />
							<StatCard icon='/svgs/clock.svg' value='8h 36m' description='Time spent' />
						</div>
					</div>
					<div>
						<SubHeading subheading='Solutions' />
						<Solutions />
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
