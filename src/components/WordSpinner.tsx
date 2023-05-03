import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import HoGuMaMachine, { GameStep } from '../lib/HoGuMaMachine'
import classes from './WordSpinner.module.scss'

SwiperCore.use([Navigation, Pagination, EffectCoverflow])
export default function WordSpinner({machine, isShowOnlyMine=false, step}: {
  machine: HoGuMaMachine
  isShowOnlyMine?: boolean
	step: GameStep
}) {
	const showAll = machine.getCheckedWords()
	const showMine = showAll.filter((val)=> val.isMine)

	console.log({showAll, showMine})

	return (
		<>
			<Swiper
				navigation
				cssMode={true}
				centeredSlides={true}
				slidesPerView={3}
				loop={true}
				spaceBetween={30}
				grabCursor={true}
				className={`${classes.list}`}
				// effect={'coverflow'}
				// coverflowEffect={{
				// 	rotate: 5,
				// 	stretch: 0,
				// 	depth: 100,
				// 	modifier: 1,
				// 	slideShadows: true,
				// }}
			>
				{(isShowOnlyMine? showMine : showAll).map((item, index) => (
					<SwiperSlide
						key={index}
						className={`${classes.item} ${item.isMine?classes.mine:''}`}
					>
						<p>{item.char}</p>
						<p>{item.isMine}</p>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
