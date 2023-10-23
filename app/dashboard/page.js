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

export default function Dashboard() {
	const [loader, setLoader] = useState(true)
	useEffect(() => {
		const userData = {
			user_email: 'anaghdeebbugsdkjfn@gmail.com',
			user_name: 'Aadfaasdfasddasdfashavan',
			user_photo: 'lmaoadsfasd@google.com',
		}

		const problemData = {
			user_email: 'sahelnriaz@gmail.com',
			qno: 12,
			code: 'tempcode',
		}

		fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(problemData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to add the user.')
				}
				return response.json()
			})
			.then((data) => {
				console.log('User added successfully:', data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
		setLoader(false)
	}, [])

	return (
		<div className={styles.container}>
			<NavbarLayout>
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
