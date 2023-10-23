import React from 'react'
import styles from './themetoggle.module.css'

export default function ThemeToggle({ theme }) {
	return <div className={`${styles.button} ${styles[theme]}`}>{theme}</div>
}
