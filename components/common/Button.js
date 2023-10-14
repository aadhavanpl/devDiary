import styles from './button.module.css'

export function GoogleSignInButton() {
	return (
		<div className={styles.googleContainer}>
			<img src='/svgs/google.svg' />
			Sign In
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

export function SubmitButton() {
	return (
		<div className={styles.submitContainer}>
			Submit
			<img src='/svgs/submit-arrow-right.svg' />
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
