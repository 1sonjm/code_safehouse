import { Switch } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

import BaseLayout from '../../components/layouts/BaseLayout'
import WordSpinner from '../../components/WordSpinner'
import HoGuMaMachine from '../../lib/HoGuMaMachine'

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
	memberCount = isNaN(memberCount) ? 2 : memberCount
	startNumber = isNaN(startNumber) ? 1 : startNumber
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

	return (
		<BaseLayout title='호구마 게임'>
			<WordSpinner
				machine={machine}
				isShowOnlyMine={isShowOnlyMine}
				step={step}
			/>
			<Switch
				onChange={(event) => setIsShowOnlyMine(event.currentTarget.checked)}
				label={'내 차례만 보기'}
			/>
			<h1>{ count }</h1>
			<button
				onClick={nextStep}
			>
				▶
			</button>
		</BaseLayout>
	)
}
