'use client'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGlobalContext } from '@/lib/utils/globalContext'

export default function Navbar({ photoURL, name }) {
	const pathname = usePathname()
	const { signOut } = useGlobalContext()

	return (
		<div className={styles['container']}>
			<div className={styles['logo-profile-wrapper']}>
				<Link href='/' className={styles.link}>
					<img src='/svgs/small-logo.svg' className={styles['logo']} alt='logo' />
				</Link>
				<div className={styles['profile-container']}>
					<img src={photoURL} className={styles['profile-pic']} />
					{name}
				</div>
			</div>
			<div className={styles['navbar-items']}>
				<Link href='/dashboard' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/dashboard' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/dashboard.svg' className={styles['icon']} alt='icon' />
						Dashboard
					</div>
				</Link>
				<Link href='/problems' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/problems' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/problems.svg' className={styles['icon']} alt='icon' />
						Problems
					</div>
				</Link>
				<Link href='/bookmarks' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/bookmarks' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/bookmarks.svg' className={styles['icon']} alt='icon' />
						Bookmarks
					</div>
				</Link>
				<Link href='/archive' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/archive' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/archive.svg' className={styles['icon']} alt='icon' />
						Archive
					</div>
				</Link>
				<Link href='/leaderboards' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/leaderboards' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/leaderboards.svg' className={styles['icon']} alt='icon' />
						Leaderboards
					</div>
				</Link>
				<Link href='/settings' className={styles.link}>
					<div
						className={`${styles['button-container']} ${
							pathname === '/settings' ? styles['active-button'] : null
						}`}
					>
						<img src='/svgs/settings.svg' className={styles['icon']} alt='icon' />
						Settings
					</div>
				</Link>
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
