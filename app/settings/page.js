'use client'
import React, { useEffect, useState } from 'react'
import styles from './settings.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import SubHeading from '@/components/common/SubHeading'
import Loader from '@/components/common/Loader'
import { useGlobalContext } from '@/lib/utils/globalContext'
import { UserNameChangeSubmit } from '@/components/common/Button'

export default function Settings() {
	const [userName, setUserName] = useState('')
	const [loader, setLoader] = useState(true)
	const { user, updateUserName } = useGlobalContext()

	useEffect(() => {
		if (!user) return
		async function fetchUserName() {
			const res = await fetch('http://localhost:3000/api/fetchUserName', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: user?.user_email,
				}),
			})
			const temp = await res.json()
			setUserName(temp.tempUsers.user_name)
			setLoader(false)
		}
		fetchUserName()
	}, [user])

	function handleChange(e) {
		setUserName(e.target.value)
	}

	function handleSubmit() {
		updateUserName(user?.user_email, userName)
	}

	return (
		<div className={styles['container']}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='settings' desc='Update your settings here' />
				<div className={styles['wrapper']}>
					<SubHeading subheading='User Name' />
					<div className={styles.nameChange}>
						<input defaultValue={userName} maxLength='20' onChange={handleChange} />
						<UserNameChangeSubmit onClick={handleSubmit} />
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
			<Loader loader={loader} />
		</div>
	)
}

function ThemeToggle({ theme }) {
	return <div className={`${styles.button} ${styles[theme]}`}>{theme}</div>
}
