import { Switch } from '@mantine/core'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

import BaseLayout from '../../components/layouts/BaseLayout'
import WordSpinner from '../../components/WordSpinner'
import HoGuMaMachine from '../../lib/HoGuMaMachine'
import classes from './game.module.scss'

export default function Home() {
	// url query 처리
	const router = useRouter()
	const words = (Array.isArray(router.query.words)
		? router.query.words[0]
		: router.query.words) || '호박고구마'
	let memberCount = Number(Array.isArray(router.query.memberCount)
		? router.query.memberCount[0]
		: router.query.memberCount)
	let startNumber = Number(Array.isArray(router.query.startNumber)
		? router.query.startNumber[0]
		: router.query.startNumber)
	let timeLimit = Number(Array.isArray(router.query.timeLimit)
		? router.query.timeLimit[0]
		: router.query.timeLimit)
	memberCount = isNaN(memberCount) ? 2 : memberCount
	startNumber = isNaN(startNumber) ? 1 : startNumber
	timeLimit = isNaN(timeLimit) ? 3 : timeLimit
	// //

	// 호구마 머신 초기화
	const [machine, setMachine] = useState(new HoGuMaMachine(words, memberCount, startNumber))
	// let rearrangeWords = machine.getRearrangedWords()
	let step = machine.getStep()
	const nextStep = async () => {
		step = await machine.nextStep()
		if(step) {
			console.log(step, machine.date)
			setCount(count + 1)
		}
		// rearrangeWords = machine.getRearrangedWords()
	}
	// //

	const [count, setCount] = useState(0)
	const [isShowOnlyMine, setIsShowOnlyMine] = useState(false)

	const onTimeEvent = () => {
		console.log('time event', new Date())
		nextStep()
	}

	return (
		<BaseLayout title='호구마 게임'>
			<WordSpinner
				machine={machine}
				isShowOnlyMine={isShowOnlyMine}
			/>
			<Switch
				onChange={(event) => setIsShowOnlyMine(event.currentTarget.checked)}
				label={'내 차례만 보기'}
			/>
			<GameTimer timeLimit={timeLimit} onTimeEvent={onTimeEvent}/>
			<h1>{ count }</h1>
			<button
				onClick={nextStep}
			>
				▶
			</button>
		</BaseLayout>
	)
}

function GameTimer({ timeLimit, onTimeEvent }: {
	timeLimit: number
  onTimeEvent: () => void;
}) {
	const progressRef = useRef<HTMLDivElement>(null)
	const restartAnimation = useCallback(() => {
		if (progressRef.current) {
			progressRef.current.style.animationDuration = (timeLimit) + 's'
			progressRef.current.classList.remove(classes.progress)
			progressRef.current.offsetHeight // trigger reflow
			progressRef.current.classList.add(classes.progress)
		}
	}, [timeLimit])

	useEffect(() => {
		const gameInterval = setInterval(() => {
			onTimeEvent()
			restartAnimation()
		}, timeLimit * 1000)
		return () => {
			clearInterval(gameInterval)
		}
	}, [restartAnimation, onTimeEvent, timeLimit])

	return (
		<>
			<div className={`${classes.gameTimer}`}>
				<i
					ref={progressRef}
					className={`${classes.progress}`}
					style={{
						animationDuration: `${timeLimit}s`,
					}}
				/>
			</div>
		</>
	)
}
