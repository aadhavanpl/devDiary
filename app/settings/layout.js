import '../globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
	display: 'swap',
})

export const metadata = {
	title: 'devDiary | Settings',
	description: 'Access settings here',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body style={montserrat.style}>{children}</body>
		</html>
	)
}
