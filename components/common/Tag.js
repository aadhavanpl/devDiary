import styles from './tag.module.css'
export default function Tag({ tag, color }) {
	return (
		<div className={styles.container} style={{ backgroundColor: color }}>
			{tag}
		</div>
	)
}
