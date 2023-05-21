import { Container } from '@mantine/core'
import Head from 'next/head'

import classes from './index.module.scss'

export default function Home() {

	return (
		<>
			<Head>
				<title>SpongeBob Timer</title>
			</Head>

			<Container classNames={classes.content}>
				내용
			</Container>
		</>
	)
}
