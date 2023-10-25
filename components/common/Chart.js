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
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default function Chart({ chartData }) {
	/*
		get todays date
		make labels for this week and last week
		check for matching values and store it
	*/

	const [data, setData] = useState()

	useEffect(() => {
		if (chartData) {
			const today = new Date()
			const datesArray = []

			for (let i = 0; i < 14; i++) {
				const currentDate = new Date(today)
				currentDate.setDate(today.getDate() - i)

				const year = currentDate.getFullYear()
				const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
				const day = currentDate.getDate().toString().padStart(2, '0')

				const formattedDate = `${year}/${month}/${day}`
				datesArray.unshift(formattedDate)
			}

			console.log(chartData)
			console.log(datesArray)

			let latestWeek = [0, 0, 0, 0, 0, 0, 0]
			let lastWeek = [0, 0, 0, 0, 0, 0, 0]

			for (let i = 0; i < datesArray.length; i++) {
				const matchedDate = chartData.find((item) => item.date === datesArray[i])
				if (matchedDate) {
					const index = i < 7 ? i : i - 7
					if (i < 7) lastWeek[index] = matchedDate.countQuestions
					else latestWeek[index] = matchedDate.countQuestions
				}
			}

			const last7Dates = datesArray.slice(-7)

			const data = {
				labels: last7Dates,
				datasets: [
					{
						label: 'Current week',
						data: latestWeek,
						fill: true,
						borderColor: '#737bff',
						borderWidth: 5,
						borderRadius: 50,
						lineTension: 0.4,
					},
					{
						label: 'Last week',
						data: lastWeek,
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
			setData(data)
		}
	}, [chartData])

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{data ? (
					<Line data={data} maintainaspectratio={false} height={65} options={data?.options} />
				) : null}
			</div>
		</div>
	)
}
