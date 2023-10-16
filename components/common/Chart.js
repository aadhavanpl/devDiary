'use client'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
} from 'chart.js'
import styles from './chart.module.css'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)
import { Line } from 'react-chartjs-2'

export default function Chart() {
	const data = {
		labels: ['2023/10/11', '2023/10/12', '2023/10/13', '2023/10/14', '2023/10/15'],
		datasets: [
			{
				label: 'Second dataset',
				data: [2, 5, 0, 4, 1],
				fill: true,
				borderColor: '#742774',
				lineTension: 0.4,
			},
		],
	}
	return (
		<div className={styles.container}>
			<Line data={data} maintainAspectRatio={false} height={100} />
		</div>
	)
}
