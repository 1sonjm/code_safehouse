import dayjs from 'dayjs'
import { useState } from 'react'

import HistoryCard, { History } from './HistoryCard'
import classes from './HistoryList.module.scss'

export default function HistoryList({ column=4 }: {
	column?: number
}) {
	const [hisotryList, setHisotryList] = useState<Array<History>>([
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
		{words: '호구마', memberCount: 2, startNumber: 1, playStep: 10, playDate: dayjs('2023-05-01 11:00:00').toDate()},
	])

	return (
		<>
			<div className={`${classes.list}`}>
				<HistoryCard />
				{hisotryList.map((value, index)=>(
					<HistoryCard
						key={index}
						hisotry={value}
					/>
				))}
			</div>
		</>
	)
}
