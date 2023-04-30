import { Container } from '@mantine/core'

import HistoryList from '../../components/historyList'
import BaseLayout from '../../components/layouts/baseLayout'

export default function Home() {
	return (
		<BaseLayout title='게임 이력'>
			<Container size="60rem">
				<HistoryList/>
			</Container>
		</BaseLayout>
	)
}
