import styles from './page.module.css'
import { Montserrat } from '@next/font/google'
import GoogleSignIn from '@/components/buttons/GoogleSignIn'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

export default function Home() {
	return (
		<main className={styles.main} style={montserrat.style}>
			<GoogleSignIn />
		</main>
	)
}
