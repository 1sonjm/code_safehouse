import Head from 'next/head'
import Layout, { siteTitle } from '../components/layouts/layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        설명 주르륵
      </div>
      <Link href={'/playground/history'}>
        플레이
      </Link>
      <div>
        설명 주르륵
      </div>
    </Layout>
  )
}

