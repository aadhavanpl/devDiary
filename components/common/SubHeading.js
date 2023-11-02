import styles from './subheading.module.css'
import '../../app/globals.css'

export default function SubHeading({ subheading }) {
	return <div className={styles.style}>{subheading}</div>
}
