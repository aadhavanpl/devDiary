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
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default function Chart() {
	const data = {
		labels: [
			'2023/10/11',
			'2023/10/12',
			'2023/10/13',
			'2023/10/14',
			'2023/10/15',
			'2023/10/16',
			'2023/10/17',
		],
		datasets: [
			{
				label: 'Current week',
				data: [2, 5, 0, 4, 1, 10, 2],
				fill: true,
				borderColor: '#737bff',
				borderWidth: 5,
				borderRadius: 50,
				lineTension: 0.4,
			},
			{
				label: 'Last week',
				data: [5, 2, 3, 1, 8, 7, 0],
				fill: true,
				borderColor: '#5cdf939c',
				borderWidth: 5,
				borderRadius: 50,
				lineTension: 0.4,
				borderDash: [15, 10],
			},
		],
		options: {
			scales: {
				x: {
					grid: {
						display: false,
					},
				},
				y: {
					grid: {
						display: false,
					},
					ticks: {
						stepSize: 2,
					},
				},
			},
			elements: {
				point: {
					radius: 0,
				},
			},
		},
	}
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Line data={data} maintainaspectratio={false} height={65} options={data.options} />
			</div>
		</div>
	)
}
