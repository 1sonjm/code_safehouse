import 'swiper/css'
import 'swiper/css/pagination'

import { Kbd } from '@mantine/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LogoIcon from 'src/components/LogoIcon'
import SwiperCore, { Keyboard, Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import BaseLayout from '../components/layouts/BaseLayout'
import classes from './index.module.scss'

SwiperCore.use([Pagination, Keyboard, Mousewheel])

export default function Home() {
	const [numSlides, setNumSlides] = useState(0)
	const [pixelsMoved, setPixelsMoved] = useState(0)

	const handleSwiper = (swiper: SwiperCore) => {
		setNumSlides(swiper.slides.length)
	}
	const handleTouchMove = (swiper: SwiperCore) => {
		setPixelsMoved(swiper.translate)
	}

	return (
		<BaseLayout title='호구마 게임'>
			<Swiper
				speed={300}
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
				onSwiper={handleSwiper}
				onSlideChange={handleTouchMove}
			>
				<div
					className={`${classes.parallaxBackground}`}
					style={{
						transform: `translate3d(0, ${pixelsMoved / (numSlides*20) - 5}%, 0)`,
						height: `${numSlides*15 + 100}%`,
					}}
				>
					<ParallaxBackground />
				</div>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					<h2>호구마 머신</h2>
					<p className='text-center'>
						<b>호구마 머신</b>은 간단하고 빠른 템포를 가진 도전적인 게임입니다.<br />
						<b>호구마 머신</b>은 당신의 사고력과 집중력을 테스트합니다.🤪<br />
						<b>호구마 머신</b>은 당신이 호구가 아니라는 것을 증명할 수 있는 기회입니다.<br />
						<b>호구마 머신</b>은 당신을 기다리고 있습니다.<br />
					</p>
					<p>
						<LogoIcon size={'3em'} />
					</p>
					<p className='text-center'>
						<b>호구</b>가 아닌 당신을요.😎
					</p>
				</SwiperSlide>
				<SwiperSlide className={`${classes.swiperSlide}`}>
					<h2>규칙</h2>
					<ol>
						<li><Kbd>제시어</Kbd>를 정합니다. '호박고구마' 처럼요! 어떤 단어도 상관없어요!</li>
						<li><Kbd>참여인원</Kbd>, <Kbd>나의 순번</Kbd>, <Kbd>시간 제한</Kbd>을 설정해주세요.</li>
						<li>
							순서에 맞춰서 제시어를 번갈아가며 말합니다.🥵<br />
							세명이서 두번째 순서라면 '박,마,고,호,구' 를 순서마다 외치면 됩니다!
						</li>
						<li>
							상대가 잘못 말하거나, 시간을 초과하면 '<b>호구마</b>'를 외치세요!<br />
							당신이 눈치챘다면 말이죠.😅 외치지 못했다면 경기는 속행 합니다.
						</li>
						<li>맞게 외쳤다면 당신의 승리입니다! <b>즐기세요!</b></li>
					</ol>
				</SwiperSlide>
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
			</Swiper>
		</BaseLayout>
	)
}


export function ParallaxBackground() {
	type SweetPotato = {
		top: string
		left?: string
		right?: string
		duration: string
		rotate: string
	}
	const [leftSideSweetPotato, setLeftSideSweetPotato] = useState<Array<SweetPotato>>([])
	const [rightSideSweetPotato, setRightSideSweetPotato] = useState<Array<SweetPotato>>([])

	function randomRange(start:number, end:number){
		return Math.floor(Math.random() * end) + start
	}

	useEffect(() => {
		setLeftSideSweetPotato(
			Array.from({ length: 4 }, () => {
				return {
					top: `${randomRange(1, 5)}%`,
					left: `${randomRange(-1, 10)}%`,
					duration: `${randomRange(30, 100) / 10}s`,
					rotate: `rotate(${randomRange(1, 50)}deg)`,
				}
			})
		)
		setRightSideSweetPotato(
			Array.from({ length: 4 }, () => {
				return {
					top: `${randomRange(1, 5)}%`,
					right: `${randomRange(-1, 10)}%`,
					duration: `${randomRange(30, 100) / 10}s`,
					rotate: `rotate(${randomRange(1, 50)}deg)`,
				}
			})
		)
	}, [])


	return (
		<>
			{leftSideSweetPotato.map((value, index) => (
				<Image
					key={index}
					className={`${classes.sweetPotato}`}
					src="/svgs/sweetPotato.svg"
					alt="Sweet Potato"
					width={50}
					height={50}
					style={{
						top: value.top,
						left: value.left,
						animationDuration: value.duration,
						rotate: value.rotate,
					}}
				/>
			))}
			<Image
				className={`${classes.sideLeft}`}
				src="/svgs/sweetPotatoSideLeft.svg"
				alt="Side Left"
				width={250} height={450}
			/>

			{rightSideSweetPotato.map((value, index)=>(
				<Image
					key={index}
					className={`${classes.sweetPotato}`}
					src="/svgs/sweetPotato.svg"
					alt="Sweet Potato"
					width={50} height={50}
					style={{
						top: value.top,
						right: value.right,
						animationDuration: value.duration,
						rotate: value.rotate,
					}}
				/>
			))}
			<Image
				className={`${classes.sideRight}`}
				src="/svgs/sweetPotatoSideRight.svg"
				alt="Side Right"
				width={250} height={450}
			/>
		</>
	)
}
