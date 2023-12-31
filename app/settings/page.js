'use client'
import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@/lib/utils/globalContext'
import NavbarLayout from '@/app/components/NavbarLayout'
import PageHeader from '@/app/components/PageHeader'
import SubHeading from '@/app/components/SubHeading'
import Loader from '@/app/components/Loader'
import { UserNameChangeSubmit } from '@/app/components/Button'

import styles from './settings.module.css'

export default function Settings() {
	const [userName, setUserName] = useState('')
	const [loader, setLoader] = useState(true)
	const { user, updateUserName } = useGlobalContext()

	useEffect(() => {
		if (!user) return
		async function fetchUserName() {
			const res = await fetch('https://www.devdiary.live/api/fetchUserName', {
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
		setLoader(true)
		updateUserName(user?.user_email, userName)
		setLoader(false)
	}

	return (
		<div className={styles['container']}>
			<NavbarLayout photoURL={user ? user?.user_photo : null} name={user ? user?.user_name : null}>
				<PageHeader heading='settings' desc='Update your settings here' />
				<div className={styles['wrapper']}>
					<SubHeading subheading='User Name' />
					<div className={styles.nameChange}>
						<input defaultValue={userName} maxLength='20' onChange={handleChange} />
						<UserNameChangeSubmit onClick={handleSubmit} svg='/svgs/user-tick.svg' title='Submit' />
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
