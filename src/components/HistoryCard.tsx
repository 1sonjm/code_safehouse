import { AddFilled } from '@carbon/icons-react'
import { Card, Group, Stack, Text } from '@mantine/core'
import Link from 'next/link'

import classes from './HistoryCard.module.scss'

export interface History {
  words: string
  memberCount: number
  startNumber: number
}

export default function HistoryCard({ hisotry }: {
  hisotry?: History
}) {
	return (
		<>
			{hisotry!=undefined ?
				<Link href={`/playground/game/?words=${hisotry.words}&memberCount=${hisotry.memberCount}&startNumber=${hisotry.startNumber}`}>
					<div className={classes.card}>
						<Group
							position="apart" mt="md"
							mb="xs"
						>
							<Text weight={500}>
								{hisotry.words}
							</Text>
						</Group>
						<Group
							position="apart" mt="md"
							mb="xs"
						>
							<div className='game-option'>
								<span className='label'>참여인원</span>
								<span className='value'>
									{hisotry.memberCount}
								</span>
							</div>
							<div className='game-option'>
								<span className='label'>시작순번</span>
								<span className='value'>
									{hisotry.startNumber}
								</span>
							</div>
						</Group>
						<p>
							2222-11-11 11:11:11
						</p>
					</div>
				</Link>
				:
				<Link href={'/playground/new'}>
					<Card
						shadow="sm" padding="lg"
						radius="md" withBorder
						className={classes.newHistory}
					>
						<Stack
							justify='center' align='center'
							mt="md" mb="xs"
						>
							<AddFilled size={32}/>
							<p className="font-bold">
								새로운 게임
							</p>
						</Stack>
					</Card>
				</Link>
			}
		</>
	)
}
