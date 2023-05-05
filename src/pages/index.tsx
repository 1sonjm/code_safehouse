import 'swiper/css'
import 'swiper/css/pagination'

import SwiperCore, { Keyboard, Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import BaseLayout from '../components/layouts/BaseLayout'
import classes from './index.module.scss'

SwiperCore.use([Pagination, Keyboard, Mousewheel])

export default function Home() {

	return (
		<BaseLayout title='호구마 게임'>
			<Swiper
				direction='vertical'
				pagination={{
					clickable: true,
				}}
				keyboard={{
					enabled: true,
				}}
				mousewheel={true}
				className={`${classes.swiper}`}
				style={{
					height: '100vh',
				}}
			>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					<iframe
						style={{
							width: '100%',
							height: '100%',
							maxWidth: '60vw',
							maxHeight: '50vh',
							padding: '0.5rem',
							border: '0',
						}}
						src="https://www.youtube-nocookie.com/embed/vgyvy-Jhxjw?controls=0" title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					/>
				</SwiperSlide>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					Slide 2@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />
				</SwiperSlide>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					Slide 3@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />
				</SwiperSlide>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					Slide 4@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />
				</SwiperSlide>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					Slide 5@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />@@<br />
				</SwiperSlide>
			</Swiper>
		</BaseLayout>
	)
}

export async function getStaticProps() {
	return {
		props: {
		},
	}
}
