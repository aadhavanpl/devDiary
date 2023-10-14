'use client'
import React from 'react'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'

export default function Navbar({ pathname }) {
	const router = useRouter()
	const isDashboard = pathname === 'dashboard'
	const isProblems = pathname === 'problems'
	const isBookmarks = pathname === 'bookmarks'
	const isArchive = pathname === 'archive'
	const isLeaderboards = pathname === 'leaderboards'
	const isSettings = pathname === 'settings'

	return (
		<div className={styles['container']}>
			<div className={styles['logo-profile-wrapper']}>
				<img src='/svgs/small-logo.svg' className={styles['logo']} />
				<div className={styles['profile-container']}>
					<img src='/svgs/profile-pic.svg' className={styles['profile-pic']} />
					Aadhavan
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div
					className={`${styles['button-container']} ${isDashboard ? styles['active-button'] : ''}`}
					onClick={() => router.push('/')}
				>
					<img src='/svgs/dashboard.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Dashboard</div>
				</div>
				<div
					className={`${styles['button-container']} ${isProblems ? styles['active-button'] : ''}`}
				>
					<img src='/svgs/problems.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Problems</div>
				</div>
				<div
					className={`${styles['button-container']} ${isBookmarks ? styles['active-button'] : ''}`}
				>
					<img src='/svgs/bookmarks.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Bookmarks</div>
				</div>
				<div
					className={`${styles['button-container']} ${isArchive ? styles['active-button'] : ''}`}
				>
					<img src='/svgs/archive.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Archive</div>
				</div>
				<div
					className={`${styles['button-container']} ${
						isLeaderboards ? styles['active-button'] : ''
					}`}
				>
					<img src='/svgs/leaderboard.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Leaderboards</div>
				</div>
				<div
					className={`${styles['button-container']} ${isSettings ? styles['active-button'] : ''}`}
				>
					<img src='/svgs/settings.svg' className={styles['icon']} />
					<div className={styles['button-text']}>Settings</div>
				</div>
			</div>
			<div className={styles['signOut-container']}>
				<img src='/svgs/sign-out.svg' className={styles['icon']} />
				<div className={styles['button-text']}>Sign out</div>
			</div>
		</div>
	)
}
