import styles from './tag.module.css'
export function SmallTag({ tag, color }) {
	return (
		<div className={styles.smallTag} style={{ backgroundColor: color }}>
			{tag}
		</div>
	)
}

export function BigTag({ tag, color }) {
	return (
		<div className={styles.bigTag} style={{ backgroundColor: color }}>
			{tag}
		</div>
	)
}
