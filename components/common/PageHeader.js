import styles from './pageheader.module.css'

export default function PageHeader({ heading, desc }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.icon} ${styles[heading]}`}>
				<img src={`/svgs/${heading}.svg`} />
			</div>
			<div className={styles.heading}>
				{heading}
				<span>{desc}</span>
			</div>
		</div>
	)
}

export function UserPageHeader({ name, desc }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.icon} ${styles['name']}`}>
				<img src='/svgs/user.svg' />
			</div>
			<div className={styles.heading}>
				{name}
				<span>{desc}</span>
			</div>
		</div>
	)
}
