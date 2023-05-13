import { PauseFilled, PlayFilledAlt, Playlist, Restart, SettingsAdjust, SkipForwardFilled, StopFilledAlt } from '@carbon/icons-react'
import { ActionIcon, Container, Switch } from '@mantine/core'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'

import BaseLayout from '../../components/layouts/BaseLayout'
import WordSpinner from '../../components/WordSpinner'
import HoGuMaMachine from '../../lib/HoGuMaMachine'
import Howl from '../../lib/howler'
import classes from './game.module.scss'

export default function Home() {
	const [movePage, setMovePage] = useState(false)
	const [isGameStart, setIsGameStart] = useState(false)

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

	const onTimeOver = () => {
		onGameStop()
	}

	// button event
	const onGameStart = async () => {
		machine.reset()
		setCount(0)
		setIsGameStart(true)
	}
	const onGameStop = () => {
		setIsGameStart(false)
	}
	const onGamePause = () => {
		console.log('puase')
	}
	const onMoveStep = () => {
		nextStep()
	}
	const onChangeConfig = () => {
		router.push({
			pathname: '/playground/new',
			// query,
		})
	}
	const onMoveHistory = () => {
		router.push({
			pathname: '/playground/history',
		})
	}
	// ///
	return (
		<BaseLayout title='호구마 게임'>
			<Transition
				in={!movePage} timeout={1000}
				appear
			>
				{(state)=>(
					<Container
						size="50rem"
						className={`slideFromTop ${state}`}
					>
						<div className={`${classes.counter}`}>
							<span
								ref={countRef}
								className={`${classes.number}`}
							>
								{ count }
							</span>
						</div>
						<div className={`${classes.gameTimerWrap}`}>
							<GameTimer
								timeLimit={timeLimit}
								onTimeOver={onTimeOver}
								refreshTimer={count}
								isGameStart={isGameStart}
							/>
						</div>
						<div className={`${classes.wordsWrap}`}>
							<WordSpinner
								machine={machine}
								isShowOnlyMine={isShowOnlyMine}
								step={step}
								isGameStart={isGameStart}
							/>
							<Switch
								onChange={(event) => setIsShowOnlyMine(event.currentTarget.checked)}
								label={'내 차례만 보기'}
							/>
						</div>
						<div className={`${classes.buttonGroup}`}>
							{isGameStart?
								<>
									<ActionIcon
										onClick={onMoveStep}
										className={`${classes.stepButton}`}
									>
										<SkipForwardFilled />
									</ActionIcon>
									<ActionIcon
										onClick={onGamePause}
										className={`${classes.stepButton}`}
									>
										<PauseFilled />
									</ActionIcon>
								</>
								:
								<>
									<ActionIcon
										onClick={onGameStart}
										className={`${classes.stepButton}`}
									>
										{count > 0 ? <Restart /> : <PlayFilledAlt />}
									</ActionIcon>
								</>
							}
						</div>
						<div className={`${classes.buttonGroup}`}>
							{isGameStart?
								<>
									<ActionIcon
										onClick={onGameStop}
										className={`${classes.stepButton}`}
									>
										<StopFilledAlt />
									</ActionIcon>
								</>
								:
								<>
									<ActionIcon
										onClick={onChangeConfig}
										className={`${classes.stepButton}`}
									>
										<SettingsAdjust />
									</ActionIcon>
									<ActionIcon
										onClick={onMoveHistory}
										className={`${classes.stepButton}`}
									>
										<Playlist />
									</ActionIcon>
								</>
							}
						</div>
					</Container>
				)}
			</Transition>
		</BaseLayout>
	)
}

function GameTimer({ timeLimit, onTimeOver, refreshTimer, isGameStart }: {
	timeLimit: number
  onTimeOver: () => void
  refreshTimer: number
  isGameStart: boolean
}) {
	const sfxHoguma = Howl('sounds/hoguma.mp3')
	const sfxMoveStep = Howl('sounds/move_step.mp3')
	const progressRef = useRef<HTMLDivElement>(null)
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
	const restartAnimation = useCallback(() => {
		if (progressRef.current) {
			progressRef.current.style.animationDuration = (timeLimit) + 's'
			progressRef.current.classList.remove(classes.progress)
			progressRef.current.offsetHeight // trigger reflow
			progressRef.current.classList.add(classes.progress)
		}
	}, [timeLimit])

	const resetTimer = () => {
		clearTimeout(timeoutId)
		setTimeoutId(setTimeout(() => {
			sfxHoguma.play()
			onTimeOver()
		}, timeLimit * 1000))
	}

	// step 이동시, 타이머 리셋
	useEffect(() => {
		if(isGameStart){
			restartAnimation()
			resetTimer()
		}
		return () => {
		}
	}, [isGameStart])

	// 타임 아웃 이벤트
	useEffect(()=>{
		restartAnimation()
		resetTimer()
		sfxMoveStep.play()
	}, [refreshTimer])
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
