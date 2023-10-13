import styles from './navbarlayout.module.css'
import Navbar from './Navbar'

export default function NavbarLayout({ children }) {
	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.content}>{children}</div>
		</div>
	)
}
