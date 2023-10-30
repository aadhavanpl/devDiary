import styles from './loader.module.css'

export default function Loader({ loader }) {
	return (
		<div>
			{loader ? (
				<div className={styles.container}>
					<div className={styles.loader}></div>
				</div>
			) : null}
		</div>
	)
}
