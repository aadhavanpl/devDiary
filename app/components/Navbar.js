'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useGlobalContext } from '@/lib/utils/globalContext'

import styles from './navbar.module.css'
import '../../app/globals.css'

export default function Navbar({ photoURL, name }) {
	const pathname = usePathname()
	const { signOut } = useGlobalContext()
	const router = useRouter()

	return (
		<div className={styles['container']}>
			<div className={styles['logo-profile-wrapper']}>
				<img
					src='/svgs/small-logo.svg'
					className={styles['logo']}
					alt='logo'
					onClick={() => router.push('http://localhost:3000')}
				/>
				<div className={styles['profile-container']}>
					<img src={photoURL} className={styles['profile-pic']} />
					{name}
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div
					className={`${styles['button-container']} ${
						pathname === '/dashboard' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/dashboard')}
				>
					<img src='/svgs/dashboard.svg' className={styles['icon']} alt='icon' />
					Dashboard
				</div>
				<div
					className={`${styles['button-container']} ${
						pathname === '/problems' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/problems')}
				>
					<img src='/svgs/problems.svg' className={styles['icon']} alt='icon' />
					Problems
				</div>
				<div
					className={`${styles['button-container']} ${
						pathname === '/bookmarks' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/bookmarks')}
				>
					<img src='/svgs/bookmarks.svg' className={styles['icon']} alt='icon' />
					Bookmarks
				</div>
				<div
					className={`${styles['button-container']} ${
						pathname === '/archive' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/archive')}
				>
					<img src='/svgs/archive.svg' className={styles['icon']} alt='icon' />
					Archive
				</div>
				<div
					className={`${styles['button-container']} ${
						pathname === '/leaderboards' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/leaderboards')}
				>
					<img src='/svgs/leaderboards.svg' className={styles['icon']} alt='icon' />
					Leaderboards
				</div>
				<div
					className={`${styles['button-container']} ${
						pathname === '/settings' ? styles['active-button'] : null
					}`}
					onClick={() => router.push('/settings')}
				>
					<img src='/svgs/settings.svg' className={styles['icon']} alt='icon' />
					Settings
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div className={styles['button-container']} onClick={signOut}>
					<img src='/svgs/sign-out.svg' className={styles['icon']} alt='icon' />
					Sign out
				</div>
			</div>
		</div>
	)
}
