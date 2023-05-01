import { LogoGithub } from '@carbon/icons-react'
import { ActionIcon, Header, rem } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'

import DarkModeButton from '../DarkModeToggle'
import LogoIcon from '../LogoIcon'
import classes from './HeaderLayout.module.scss'

const HEADER_HEIGHT = rem(46)

export default function HeaderLayout ({}) {
	const [siteLinks, setSiteLinks] = useState([
		{ label: '소개', link: '/' },
		{ label: '게임', link: '/playground/new' },
		{ label: '진행이력', link: '/playground/history' },
	])
	const [active, setActive] = useState(siteLinks[0].link)

	return (
		<>
			<Header height={HEADER_HEIGHT} className={`${classes.header}`}>
				<div>
					<section className={`${classes.siteLink}`}>
						{siteLinks.map((link) => (
							<Link
								key={link.label}
								href={link.link}
								className={`${active === link.link ? classes.selected : ''}`}
								onClick={(event) => {
									setActive(link.link)
								}}
							>
								{link.label}
							</Link>
						))
						}
					</section>
					<section className={`${classes.logo}`}>
						<Link href="/" className={'titleLogo'}>
							<LogoIcon size={30} />
						</Link>
					</section>
					<section className={`${classes.buttonGroup}`}>
						<ActionIcon size={30}>
							<Link
								href={'https://github.com/1sonjm/HoGuMa_Machine'}
								target="_blank"
								rel="noopener noreferrer"
							>
								<LogoGithub />
							</Link>
						</ActionIcon>
						<ActionIcon>
							<DarkModeButton />
						</ActionIcon>
					</section>
				</div>
			</Header>
		</>
	)
}
