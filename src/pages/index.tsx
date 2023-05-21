import { LogoReact } from '@carbon/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import BaseLayout from '../components/layouts/BaseLayout'
import classes from './index.module.scss'

interface ProjectInfo {
	name: string
	link: string
	icon?: string
}

export default function Home() {
	const gameProejctList: Array<ProjectInfo> = [
		{name: '호구마 게임', link: 'hoguma', icon: 'svgs/sweetPotato.svg'},
		{name: '스펀지밥 타이머', link: 'spongeTimer'},
	]

	return (
		<BaseLayout>
			<ul className={classes.projectList}>
				{gameProejctList.map((project, index)=>(
					<li
						key={index}
						className={classes.projectItem}
					>
						<Link href={project.link}>
							{project.icon?
								<Image
									src={project.icon}
									alt="Project icon image"
									width={50}
									height={50}
									style={{margin: 'auto'}}
								/>
								:
								<LogoReact />
							}
							<h3>{project.name}</h3>
						</Link>
					</li>
				))}
			</ul>
		</BaseLayout>
	)
}
