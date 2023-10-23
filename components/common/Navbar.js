'use client'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
	const router = useRouter()
	const pathname = usePathname()
	const isDashboard = pathname === '/dashboard'
	const isProblems = pathname === '/problems'
	const isBookmarks = pathname === '/bookmarks'
	const isArchive = pathname === '/archive'
	const isLeaderboards = pathname === '/leaderboards'
	const isSettings = pathname === '/settings'

	return (
		<div className={styles['container']}>
			<div className={styles['logo-profile-wrapper']}>
				<img
					src='/svgs/small-logo.svg'
					className={styles['logo']}
					alt='logo'
					onClick={() => router.push('/')}
				/>
				<div className={styles['profile-container']}>
					<img src='/svgs/profile-pic.svg' className={styles['profile-pic']} alt='profile-pic' />
					Aadhavan
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div
					className={`${styles['button-container']} ${isDashboard ? styles['active-button'] : ''}`}
					onClick={() => router.push('/dashboard')}
				>
					<img src='/svgs/dashboard.svg' className={styles['icon']} alt='icon' />
					Dashboard
				</div>
				<div
					className={`${styles['button-container']} ${isProblems ? styles['active-button'] : ''}`}
					onClick={() => router.push('/problems')}
				>
					<img src='/svgs/problems.svg' className={styles['icon']} alt='icon' />
					Problems
				</div>
				<div
					className={`${styles['button-container']} ${isBookmarks ? styles['active-button'] : ''}`}
					onClick={() => router.push('/bookmarks')}
				>
					<img src='/svgs/bookmarks.svg' className={styles['icon']} alt='icon' />
					Bookmarks
				</div>
				<div
					className={`${styles['button-container']} ${isArchive ? styles['active-button'] : ''}`}
					onClick={() => router.push('/archive')}
				>
					<img src='/svgs/archive.svg' className={styles['icon']} alt='icon' />
					Archive
				</div>
				<div
					className={`${styles['button-container']} ${
						isLeaderboards ? styles['active-button'] : ''
					}`}
					onClick={() => router.push('/leaderboards')}
				>
					<img src='/svgs/leaderboards.svg' className={styles['icon']} alt='icon' />
					Leaderboards
				</div>
				<div
					className={`${styles['button-container']} ${isSettings ? styles['active-button'] : ''}`}
					onClick={() => router.push('/settings')}
				>
					<img src='/svgs/settings.svg' className={styles['icon']} alt='icon' />
					Settings
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div className={styles['button-container']}>
					<img src='/svgs/sign-out.svg' className={styles['icon']} alt='icon' />
					Sign out
				</div>
			</div>
		</div>
	)
}
