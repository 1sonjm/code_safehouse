import BaseLayout from '../../components/layouts/baseLayout'
import Link from 'next/link'
import HistoryList from 'src/components/historyList'

export default function Home() {
  return (
    <BaseLayout title='게임 이력'>
      <Link href={'/playground/new'}>새로운 게임</Link>
      <HistoryList/>
    </BaseLayout>
  )
}