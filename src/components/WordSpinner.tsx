import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useState } from 'react'
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'

import HoGuMaMachine, { GameStep } from '../lib/HoGuMaMachine'
import classes from './WordSpinner.module.scss'

SwiperCore.use([Navigation, Pagination, EffectCoverflow])
export default function WordSpinner({machine, isShowOnlyMine=false, step, isGameStart}: {
  machine: HoGuMaMachine
  isShowOnlyMine?: boolean
  step: GameStep
  isGameStart: boolean
}) {
	const setting = machine.getSetting()
	const [baseWords, setBaseWords] = useState(setting.words)

	const [cursorNow, setCursorNow] = useState(0)
	const [cursorNext, setCursorNext] = useState(cursorNow + 1)
	useEffect(() => {
		if (isShowOnlyMine) {
			if(step.isMyTurn){
				setCursorNow((step.totalCount + setting.memberCount) % baseWords.length)
			}
			setCursorNext(step.totalCount % baseWords.length)
		} else {
			setCursorNow(step.totalCount % baseWords.length)
			setCursorNext((step.totalCount + 1) % baseWords.length)
		}
	}, [step])
	useEffect(() => {
		if (isGameStart) {
			setCursorNow(0)
			setCursorNext(0)
		}
	}, [isGameStart])

	return (
		<>
			<div
				className={`${classes.targetWords}`}
				style={{width: `${baseWords.length*2}em`}}
			>
				<section
					className={`${classes.cursor}`}
					style={{
						gridTemplateColumns: `repeat(${baseWords.length}, minmax(1em, auto))`,
					}}
				>
					<i
						className={`${classes.step} ${classes.mine}`}
						style={{transform: `translateX(${cursorNow * 2.04}em)`}}
					/>
					<i
						className={`${classes.step}`}
						style={{transform: `translateX(${cursorNext * 2.04}em)`}}
					/>
				</section>

				<section className={`${classes.text}`}>
					{baseWords.split('').map((char, index) => (
						<span
							key={index}
							className={`${classes.char}`}
						>
							{char}
						</span>
					))}
				</section>
			</div>
		</>
	)
}
