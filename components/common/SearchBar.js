'use client'
import React, { useState } from 'react'
import Fuse from 'fuse.js'
import styles from './searchbar.module.css'

export function SearchBar({ search, setSearch }) {
	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<img src='/svgs/search.svg' />
				<input
					placeholder='Search up a leetcode problem'
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<img
					src='/svgs/x.svg'
					alt='close'
					onClick={() => setSearch('')}
					style={{ cursor: 'pointer' }}
				/>
			</div>
		</div>
	)
}

export function HomeSearchBar({ search, setSearch }) {
	return (
		<div className={styles.inputWrapper}>
			<img src='/svgs/search.svg' alt='search' />
			<input
				placeholder='Search a leetcode problem'
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
			<img
				src='/svgs/x.svg'
				alt='close'
				onClick={() => setSearch('')}
				style={{ cursor: 'pointer' }}
			/>
		</div>
	)
}
