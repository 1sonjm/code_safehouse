import { Container } from '@mantine/core'

import HistoryList from '../../components/HistoryList'
import BaseLayout from '../../components/layouts/BaseLayout'

export default function Home() {
	return (
		<BaseLayout title='게임 이력'>
			<Container size="60rem">
				<HistoryList/>
			</Container>
		</BaseLayout>
	)
}
