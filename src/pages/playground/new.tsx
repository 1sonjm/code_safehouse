import { ParsedUrlQueryInput } from 'node:querystring'

import { Button, Center, Container, NumberInput, Space, TextInput } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Transition } from 'react-transition-group'

import BaseLayout from '../../components/layouts/BaseLayout'
import LogoIcon from '../../components/LogoIcon'
import Howl from '../../lib/howler'

const STORAGE_KEY_HISTORY = process.env.STORAGE_KEY_HISTORY || ''
export interface Query extends ParsedUrlQueryInput{
	words?: string,
	memberCount?: number,
	startNumber?: number,
	timeLimit?: number,
}

export default function Home() {
	const router = useRouter()

	const [words, setWords] = useState('')
	const [memberCount, setMemberCount] = useState<number | ''>(2)
	const [startNumber, setStartNumber] = useState<number | ''>(1)
	const [timeLimit, setTimeLimit] = useState<number | ''>(5)

	// step 이동시, 타이머 리셋
	useEffect(() => {
		setWords(
			(Array.isArray(router.query.words)
				? router.query.words[0]
				: router.query.words) || '호박고구마'
		)
		setMemberCount(
			Number(Array.isArray(router.query.memberCount)
				? router.query.memberCount[0]
				: router.query.memberCount || 2)
		)
		setStartNumber(
			Number(Array.isArray(router.query.startNumber)
				? router.query.startNumber[0]
				: router.query.startNumber || 1)
		)
		setTimeLimit(
			Number(Array.isArray(router.query.timeLimit)
				? router.query.timeLimit[0]
				: router.query.timeLimit || 5)
		)
	}, [router.query])

	const generateNewGame = () => {
		setMovePage(true)
		Howl('sounds/um_delicias.mp3').play()

		const query: Query = {}
		if (words?.length){
			query.words = words
		}
		if (memberCount != '' && memberCount >= 2){
			query.memberCount = memberCount
		}
		if (startNumber != '' && startNumber >= 1){
			query.startNumber = startNumber
		}
		if (timeLimit != '' && timeLimit >= 1){
			query.timeLimit = timeLimit
		}

		saveHistory(query)

		router.push({
			pathname: '/playground/game',
			query,
		})
	}

	const saveHistory = (query: Query) => {
		const item = window.localStorage.getItem(STORAGE_KEY_HISTORY)
		const historyList = item ? JSON.parse(item) : []
		historyList.push({...query, playDate: new Date()})
		window.localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(historyList))
	}

	const [movePage, setMovePage] = useState(false)
	return (
		<BaseLayout title='호구마 게임'>
			<Transition
				in={!movePage} timeout={1000}
				appear
			>
				{(state)=>(
					<Container
						size="20rem"
						className={`slideFromTop ${state}`}
					>
						<TextInput
							placeholder="호박고구마"
							label="제시어"
							value={words} onChange={(event) => setWords(event.currentTarget.value)}
						/>
						<Space h="md" />
						<NumberInput
							defaultValue={2}
							placeholder="2"
							label="참여 인원"
							value={memberCount} onChange={setMemberCount}
							max={120}
							min={2}
						/>
						<Space h="md" />
						<NumberInput
							defaultValue={1}
							placeholder="1"
							label="시작 순번"
							value={startNumber} onChange={setStartNumber}
							max={memberCount || 2}
							min={1}
						/>
						<Space h="md" />
						<NumberInput
							defaultValue={3}
							placeholder="1"
							label="시간제한"
							value={timeLimit} onChange={setTimeLimit}
							min={1}
							step={1}
						/>
						<Space h="md" />
						<Center>
							<Button
								leftIcon={<LogoIcon size='1.4em' />}
								onClick={generateNewGame}
								// disabled={words.length < 1}
							>
								생성
							</Button>
						</Center>
					</Container>
				)}
			</Transition>
		</BaseLayout>
	)
}
