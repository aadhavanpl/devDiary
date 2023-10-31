'use client'
import React, { useEffect, useState } from 'react'
import styles from './settings.module.css'
import NavbarLayout from '@/components/common/NavbarLayout'
import PageHeader from '@/components/common/PageHeader'
import SubHeading from '@/components/common/SubHeading'
import ThemeToggle from '@/components/common/ThemeToggle'
import Loader from '@/components/common/Loader'

export default function Settings() {
	const [userName, setUserName] = useState('')
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		async function fetchUserName() {
			// setLoader(true)
			const res = await fetch('http://localhost:3000/api/fetchUserName', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_email: 'user2@example.com',
				}),
			})
			const temp = await res.json()
			setUserName(temp.tempUsers.user_name)
			setLoader(false)
		}
		fetchUserName()
	}, [])

	function handleChange(e) {
		setUserName(e.target.value)
	}

	async function handleSubmit() {
		setLoader(true)
		const res = await fetch('http://localhost:3000/api/updateUserName', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_email: 'user2@example.com',
				user_name: userName,
			}),
		})
		setLoader(false)
	}

	function themeToLight(){
		localStorage.setItem('darkmode',false);
		var element = document.body;
		document.body.classList.remove('dark');
	}

	function themeToDark(){
		localStorage.setItem('darkmode',true);
		var element = document.body;
		document.body.classList.add('dark');
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
								<input defaultValue={userName} maxLength='20' onChange={handleChange} />
							</div>
						</div>
						<img src='/svgs/submit.svg' className={styles['submitButton']} onClick={handleSubmit} />
					</div>
					<div className={styles['theme-wrapper']}>
						<SubHeading subheading='Theme' />
						<div className={styles['themeToggleWrapper']}>
							<button onClick={themeToLight}> <ThemeToggle theme='L' /></button>
							<button onClick={themeToDark}><ThemeToggle theme='D' /></button>
						</div>
					</div>
				</div>
			</NavbarLayout>
			{/* <Loader loader={loader} /> */}
		</div>
	)
}