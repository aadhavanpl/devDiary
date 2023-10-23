'use client'
import Link from 'next/link'
import styles from './button.module.css'
import { useGlobalContext } from '@/lib/utils/globalContext'
export function GoogleSignInButton() {
	const { signIn } = useGlobalContext()
	return (
		<div className={styles.googleContainer} onClick={signIn}>
			<img src='/svgs/google.svg' />
			Sign In
		</div>
	)
}

export function SignedIn({ photoURL }) {
	return (
		<div className={styles.signedInContainer}>
			<Link href='/dashboard' className={styles.link}>
				Dashboard
			</Link>
			<img src={photoURL} alt='google-image' />
		</div>
	)
}

export function RandomButton() {
	return (
		<div className={styles.randomContainer}>
			<img src='/svgs/random.svg' />
			Random
		</div>
	)
}

export function SubmitButton({ func }) {
	return (
		<div className={styles.submitContainer} onClick={func}>
			Submit
			<img src='/svgs/submit-arrow-right.svg' alt='submit' />
		</div>
	)
}

export function AddButton() {
	return (
		<div className={styles.randomContainer}>
			<img src='/svgs/add.svg' />
			Add submission
		</div>
	)
}
