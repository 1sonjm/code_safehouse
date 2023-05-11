import { ParsedUrlQueryInput } from 'node:querystring'

import { Button, Center, Container, NumberInput, Space, TextInput } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

import BaseLayout from '../../components/layouts/BaseLayout'
import LogoIcon from '../../components/LogoIcon'

interface Query extends ParsedUrlQueryInput{
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

	const generateNewGame = () => {
		alert('게임을 생성합니다')
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

		router.push({
			pathname: '/playground/game',
			query,
		})
	}

	return (
		<BaseLayout title='호구마 게임'>
			<Container size="20rem">
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
					min={0.1}
					step={0.1}
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
		</BaseLayout>
	)
}
