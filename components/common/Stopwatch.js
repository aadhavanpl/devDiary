import { UserNameChangeSubmit } from './Button'
import styles from './stopwatch.module.css'
export default function Stopwatch({ time, running, startStopwatch, resetStopwatch }) {
	const secondDeg = (time % 60) * 6
	const minuteDeg = ((time / 60) % 60) * 6
	const hourDeg = ((time / 3600) % 12) * 30

	const formattedTime = new Date(time * 1000).toISOString().substr(11, 8)

	return (
		<div className={styles.clockContainer}>
			<div className={styles.clockWrapper}>
				<div className={styles.analog}>
					<svg width='150' height='150'>
						<circle cx='75' cy='75' r='65' fill='none' strokeWidth='3' stroke='black' />
						<line
							x1='75'
							y1='75'
							x2='75'
							y2='15'
							strokeWidth='3'
							stroke='black'
							transform={`rotate(${hourDeg}, 75, 75)`}
						/>
						<line
							x1='75'
							y1='75'
							x2='75'
							y2='25'
							strokeWidth='1.5'
							stroke='black'
							transform={`rotate(${minuteDeg}, 75, 75)`}
						/>
						<line
							x1='75'
							y1='75'
							x2='75'
							y2='35'
							stroke='red'
							transform={`rotate(${secondDeg}, 75, 75)`}
						/>
					</svg>
				</div>
				<div className={styles.digital}>{formattedTime}</div>
				<div className={styles.clockButtons}>
					<UserNameChangeSubmit
						onClick={startStopwatch}
						title={running ? 'Pause' : 'Start'}
						svg={running ? '/svgs/pause.svg' : '/svgs/play.svg'}
					/>
					<UserNameChangeSubmit onClick={resetStopwatch} title='Reset' svg='/svgs/reset.svg' />
				</div>
			</div>
		</div>
	)
}
