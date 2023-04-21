import { Button } from '@mantine/core'
import Link from 'next/link'

import BaseLayout from '../components/layouts/baseLayout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <BaseLayout title='호구마 게임'>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <Button>test</Button>
        <ul className={utilStyles.list}>
          {[1, 2, 3].map((value, index) => (
            <li className={utilStyles.listItem} key={index}>
              <Link href={`/posts/${index}`}>{ value }</Link>
              <br/>
              { value }
            </li>
          ))}
        </ul>
      </section>
    </BaseLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
    },
  }
}
