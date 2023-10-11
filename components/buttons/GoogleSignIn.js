import React from 'react'
import styles from './googlesignin.module.css'

export default function GoogleSignIn() {
	return (
		<div className={styles['container']}>
			<img src='/svgs/google.svg' />
			Sign In
		</div>
	)
}
