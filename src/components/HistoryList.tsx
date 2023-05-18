import { AddFilled } from '@carbon/icons-react'
import { Stack } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useState } from 'react'

import classes from './HistoryList.module.scss'

const STORAGE_KEY_HISTORY = process.env.STORAGE_KEY_HISTORY || ''

export interface History {
	words: string
	memberCount: number
	startNumber: number
	timeLimit: number
  playDate?: Date
}

export default function HistoryList({ column=4 }: {
	column?: number
}) {
	const [hisotryList, setHisotryList] = useState<Array<History>>(() => {
		if (typeof window !== 'undefined') {
			if(STORAGE_KEY_HISTORY){
				const listString = window.localStorage.getItem(STORAGE_KEY_HISTORY)
				return listString ? JSON.parse(listString) : []
			}
			return []
		}
	})

	return (
		<>
			<div className={`${classes.list}`}>
				<HistoryCard />
				{hisotryList?.map((value, index)=>(
					<HistoryCard
						key={index}
						hisotry={value}
					/>
				))}
			</div>
		</>
	)
}

export function HistoryCard({ hisotry }: {
	hisotry?: History
}) {
	return (
		<>
			{hisotry!=undefined ?
				<Link href={`/playground/game/?words=${hisotry.words}&memberCount=${hisotry.memberCount}&startNumber=${hisotry.startNumber}&timeLimit=${hisotry.timeLimit}`}>
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
								<span className={`${classes.label}`}>시간제한</span>
								<span className={`${classes.value}`}>
									{hisotry.timeLimit}
								</span>
							</div>
						</section>
						{hisotry.playDate?
							<div className={`${classes.date}`}>
								{hisotry.playDate ? dayjs(hisotry.playDate).format('YYYY년 MM월 DD일 hh:mm:ss') : '-'}
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
