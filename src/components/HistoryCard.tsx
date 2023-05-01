import { AddFilled } from '@carbon/icons-react'
import { Stack } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'

import classes from './HistoryCard.module.scss'

export interface History {
	words: string
	memberCount: number
	startNumber: number
	playStep: number
  playDate?: Date
}

export default function HistoryCard({ hisotry }: {
	hisotry?: History
}) {
	return (
		<>
			{hisotry!=undefined ?
				<Link href={`/playground/game/?words=${hisotry.words}&memberCount=${hisotry.memberCount}&startNumber=${hisotry.startNumber}`}>
					<div className={`${classes.card} ${classes.prev}`}>
						<p className={`${classes.title}`}>
							{hisotry.words}
						</p>
						<section className={`${classes.options}`}>
							<div className={`${classes.gameOption}`}>
								<span className={`${classes.label}`}>참여인원</span>
								<span className={`${classes.value}`}>
									{hisotry.memberCount}
								</span>
							</div>
							<div className={`${classes.gameOption}`}>
								<span className={`${classes.label}`}>시작순번</span>
								<span className={`${classes.value}`}>
									{hisotry.startNumber}
								</span>
							</div>
							<div className={`${classes.gameOption}`}>
								<span className={`${classes.label}`}>진행수</span>
								<span className={`${classes.value}`}>
									{hisotry.playStep}
								</span>
							</div>
						</section>
						{hisotry.playDate?
							<div className={`${classes.date}`}>
								{dayjs(hisotry.playDate).format('YYYY년 MM월 DD일 hh:mm:ss')}
							</div>
							:''
						}
					</div>
				</Link>
				:
				<Link href={'/playground/new'}>
					<div className={`${classes.card} ${classes.new}`}>
						<Stack
							justify='center' align='center'
							mt="md" mb="xs"
						>
							<AddFilled size={32}/>
							<p className="font-bold">
								새로운 게임
							</p>
						</Stack>
					</div>
				</Link>
			}
		</>
	)
}
