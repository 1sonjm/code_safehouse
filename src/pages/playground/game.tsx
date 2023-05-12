import { SkipForwardFilled } from '@carbon/icons-react'
import { ActionIcon, Container, Switch } from '@mantine/core'
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
	const countRef = useRef<HTMLDivElement>(null)
	const nextStep = async () => {
		step = await machine.nextStep()
		if(step) {
			setCount(count + 1)

			if (countRef.current) {
				countRef.current.classList.remove(classes.number)
				countRef.current.offsetHeight // trigger reflow
				countRef.current.classList.add(classes.number)
			}
		}
	}
	// //

	const [count, setCount] = useState(0)
	const [isShowOnlyMine, setIsShowOnlyMine] = useState(false)

	const onTimeEvent = () => {
		// nextStep()
	}

	return (
		<BaseLayout title='호구마 게임'>
			<Container size="50rem">
				<div className={`${classes.counter}`}>
					<span
						ref={countRef}
						className={`${classes.number}`}
					>
						{ count }
					</span>
				</div>
				<div className={`${classes.gameTimerWrap}`}>
					<GameTimer timeLimit={timeLimit} onTimeEvent={onTimeEvent}/>
				</div>
				<div className={`${classes.wordsWrap}`}>
					<WordSpinner
						machine={machine}
						isShowOnlyMine={isShowOnlyMine}
						step={step}
					/>
					<Switch
						onChange={(event) => setIsShowOnlyMine(event.currentTarget.checked)}
						label={'내 차례만 보기'}
					/>
				</div>
				<ActionIcon
					onClick={nextStep}
					className={`${classes.stepButton}`}
				>
					<SkipForwardFilled />
				</ActionIcon>
			</Container>
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
