import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useState } from 'react'
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'

import HoGuMaMachine from '../lib/HoGuMaMachine'
import classes from './WordSpinner.module.scss'

SwiperCore.use([Navigation, Pagination, EffectCoverflow])
export default function WordSpinner({machine, isShowOnlyMine=false}: {
  machine: HoGuMaMachine
  isShowOnlyMine?: boolean
}) {
	const baseWords = machine.getSetting().words
	const showAll = machine.getCheckedWords()
	const showMine = showAll.filter((val)=> val.isMine)

	console.log({showAll, showMine})

	const [cursorNow, setCursorNow] = useState(0)
	const [cursorNext, setCursorNext] = useState(cursorNow + 1)

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
						className={`${classes.step}`}
						style={{transform: `translateX(${cursorNow * 2 + 0.1}em)`}}
					/>
					<i
						className={`${classes.step} ${classes.mine}`}
						style={{transform: `translateX(${cursorNext * 2 + 0.1}em)`}}
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
