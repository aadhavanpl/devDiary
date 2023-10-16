'use client'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

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
				<picture>
					<img
						src='/svgs/small-logo.svg'
						className={styles['logo']}
						alt='logo'
						onClick={() => router.push('/')}
					/>
				</picture>
				<div className={styles['profile-container']}>
					<picture>
						<img src='/svgs/profile-pic.svg' className={styles['profile-pic']} alt='profile-pic' />
					</picture>
					Aadhavan
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div
					className={`${styles['button-container']} ${isDashboard ? styles['active-button'] : ''}`}
					onClick={() => router.push('/dashboard')}
				>
					<picture>
						<img src='/svgs/dashboard.svg' className={styles['icon']} alt='icon' />
					</picture>
					Dashboard
				</div>
				<div
					className={`${styles['button-container']} ${isProblems ? styles['active-button'] : ''}`}
					onClick={() => router.push('/problems')}
				>
					<picture>
						<img src='/svgs/problems.svg' className={styles['icon']} alt='icon' />
					</picture>
					Problems
				</div>
				<div
					className={`${styles['button-container']} ${isBookmarks ? styles['active-button'] : ''}`}
					onClick={() => router.push('/bookmarks')}
				>
					<picture>
						<img src='/svgs/bookmarks.svg' className={styles['icon']} alt='icon' />
					</picture>
					Bookmarks
				</div>
				<div
					className={`${styles['button-container']} ${isArchive ? styles['active-button'] : ''}`}
					onClick={() => router.push('/archive')}
				>
					<picture>
						<img src='/svgs/archive.svg' className={styles['icon']} alt='icon' />
					</picture>
					Archive
				</div>
				<div
					className={`${styles['button-container']} ${
						isLeaderboards ? styles['active-button'] : ''
					}`}
					onClick={() => router.push('/leaderboards')}
				>
					<picture>
						<img src='/svgs/leaderboards.svg' className={styles['icon']} alt='icon' />
					</picture>
					Leaderboards
				</div>
				<div
					className={`${styles['button-container']} ${isSettings ? styles['active-button'] : ''}`}
					onClick={() => router.push('/settings')}
				>
					<picture>
						<img src='/svgs/settings.svg' className={styles['icon']} alt='icon' />
					</picture>
					Settings
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<div className={styles['button-container']}>
					<picture>
						<img src='/svgs/sign-out.svg' className={styles['icon']} alt='icon' />
					</picture>
					Sign out
				</div>
			</div>
		</div>
	)
}
