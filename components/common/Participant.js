import React from 'react'
import styles from './participant.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Participant({ position, name, problems, email, id }) {
	const router = useRouter()

	function handleClick() {
		router.push(`/user/${id}`, { id, name, email })
	}

	return (
		// <Link href={'/user/' + email}>
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.leftWrapper}>
				<div className={styles.position}>
					{position == 1 ? (
						<img src='/svgs/pos-1.svg' />
					) : position == 2 ? (
						<img src='/svgs/pos-2.svg' />
					) : position == 3 ? (
						<img src='/svgs/pos-3.svg' />
					) : (
						position
					)}
				</div>
				<div className={styles.name}>{name}</div>
			</div>
			<div className={styles.rightWrapper}>
				<div className={styles.problemsDoneWrapper}>
					<img src='/svgs/problems-done.svg' />
					{problems}
				</div>
				<img src='/svgs/arrow-right.svg' />
			</div>
		</div>
		// </Link>
	)
}
