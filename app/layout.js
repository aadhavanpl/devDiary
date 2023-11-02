import './globals.css'
import { Montserrat } from 'next/font/google'
import { GlobalContextWrapper } from '@/lib/utils/globalContext'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

export const metadata = {
	title: 'devDiary | Search',
	description: 'Search up a leetcode problem',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body style={montserrat.style}>
				<GlobalContextWrapper>{children}</GlobalContextWrapper>
			</body>
		</html>
	)
}
