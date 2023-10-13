import React from 'react'
import styles from './searchbar.module.css'

export default function SearchBar() {
	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<img src='/svgs/search.svg' />
				<input placeholder='Search up a leetcode problem' />
				<img src='/svgs/x.svg' />
			</div>
		</div>
	)
}
