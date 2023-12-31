import styles from './scrollbutton.module.css'
import '../../app/globals.css'

export default function ScrollButton() {
	return (
		<img
			src='/svgs/scroll-up.svg'
			className={styles['scrollButton']}
			onClick={() => window.scrollTo(0, 0)}
			alt='scroll-up'
		/>
	)
}
