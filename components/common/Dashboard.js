import React from 'react'
import styles from './dashboard.module.css'
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600'],
})

export default function Dashboard({ image, title, caption }) {
    return (
        <div className={styles.container}>
            <div className={styles.titlewrapper}>
                <div className={styles.imagecontainer}>
                    <img src={image} className={styles.logo} />
                </div>
                <div className={styles.title} style={montserrat.style}>
                    {title}
                </div>
            </div>
            <div className={styles.caption} style={montserrat.style}>
                {caption}
            </div>
        </div>
    )
}
