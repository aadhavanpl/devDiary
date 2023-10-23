import '../globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

export const metadata = {
	title: 'devDiary | Bookmarks',
	description: 'Bookmarked questions',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body style={montserrat.style}>{children}</body>
		</html>
	)
}
