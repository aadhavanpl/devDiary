'use client'
import React, { useState } from 'react'
import styles from './searchbar.module.css'

export default function SearchBar({ setSearch }) {
	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<img src='/svgs/search.svg' />
				<input
					placeholder='Search up a leetcode problem'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<img src='/svgs/x.svg' />
			</div>
		</div>
	)
}
