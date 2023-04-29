import { ParsedUrlQueryInput } from 'node:querystring'

import { Button, Center, Container, NumberInput, Space, TextInput } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

import BaseLayout from '../../components/layouts/baseLayout'
import Logo from '../../components/Logo'

interface Query extends ParsedUrlQueryInput{
  words?: string,
  memberCount?: number,
  startNumber?: number,
}

export default function Home() {
	const router = useRouter()

	const [words, setWords] = useState('')
	const [memberCount, setMemberCount] = useState<number | ''>(2)
	const [startNumber, setStartNumber] = useState<number | ''>(1)

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
					withAsterisk
					value={words} onChange={(event) => setWords(event.currentTarget.value)}
				/>
				<Space h="md" />
				<NumberInput
					defaultValue={2}
					placeholder="참여 인원"
					label="참여 인원"
					withAsterisk
					value={memberCount} onChange={setMemberCount}
					max={120}
					min={2}
				/>
				<Space h="md" />
				<NumberInput
					defaultValue={1}
					placeholder="시작 순번"
					label="시작 순번"
					withAsterisk
					value={startNumber} onChange={setStartNumber}
					max={memberCount || 2}
					min={1}
				/>
				<Space h="md" />
				<Center>
					<Button
						leftIcon={<Logo size={30} />}
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
