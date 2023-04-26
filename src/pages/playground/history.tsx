import { Container } from '@mantine/core'
import Link from 'next/link'
import HistoryList from 'src/components/historyList'

import BaseLayout from '../../components/layouts/baseLayout'

export default function Home() {
  return (
    <BaseLayout title='게임 이력'>
      <Container size="60rem">
        <Link href={'/playground/new'}>새로운 게임</Link>
        <HistoryList/>
      </Container>
    </BaseLayout>
  )
}
