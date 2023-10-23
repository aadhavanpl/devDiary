'use client'
import React, { useEffect, useState } from 'react'
import styles from './settings.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import SubHeading from '@/components/common/SubHeading'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function page() {
	const [userName, setUserName] = useState('') // Use a single userName state

	useEffect(() => {
		async function fetchUserName() {
			// Fetch the initial user name
			const res = await fetch('http://localhost:3000/api/fetchUserName', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
				}),
			})
			const temp = await res.json()
			setUserName(temp.tempUsers.user_name)
		}
		fetchUserName()
	})

	function handleChange(e) {
		setUserName(e.target.value)
	}

	function handleSubmit() {
		console.log(userName)
	}

	return (
		<div className={styles['container']}>
			<NavbarLayout>
				<PageHeader heading='Settings' desc='Update your settings here' />
				<div className={styles['wrapper']}>
					<SubHeading subheading='User Name' />
					<div className={styles['user-wrapper']}>
						<div className={styles['userName']}>
							<div className={styles['inputWrapper']}>
								<input defaultValue={userName} maxLength='20' />
							</div>
						</div>
						<input type='submit' className={styles['submitButton']} onClick={handleSubmit} />
					</div>
					<div className={styles['theme-wrapper']}>
						<SubHeading subheading='Theme' />
						<div className={styles['themeToggleWrapper']}>
							<ThemeToggle theme='L' />
							<ThemeToggle theme='D' />
						</div>
					</div>
				</div>
			</NavbarLayout>
		</div>
	)
}
