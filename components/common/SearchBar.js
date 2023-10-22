'use client'
import React, { useState } from 'react'
import styles from './searchbar.module.css'

export default function SearchBar({ search, setSearch }) {
	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<img src='/svgs/search.svg' />
				<input
					placeholder='Search up a leetcode problem'
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<img src='/svgs/x.svg' onClick={() => setSearch('')} style={{ cursor: 'pointer' }} />
			</div>
		</div>
	)
}
