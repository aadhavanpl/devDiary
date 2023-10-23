import styles from './navbarlayout.module.css'
import Navbar from './Navbar'

export default function NavbarLayout({ children, photoURL, name }) {
	return (
		<div className={styles.container}>
			<Navbar photoURL={photoURL} name={name} />
			<div className={styles.content}>{children}</div>
		</div>
	)
}
