'use client'
import '../globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

const metadata = {
	title: 'devDiary | Dashboard',
	description: 'Track your progress practicing Leetcode here!',
}

export default function RootLayout({ children }) {
	function onLoad(){
		if(localStorage.getItem('darkmode')==='true')
			document.body.classList.add('dark');
		else if(document.body.classList.contains('dark'))
			document.body.classList.remove('dark');
	}
	return (
		<html lang='en'>
			<body onLoad={onLoad} style={montserrat.style}>{children}</body>
		</html>
	)
}
