import React from 'react'
import Head from 'next/head'
import NavBar from './navBar'

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = '호구마 머신' }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <header>
      <img />
      <h1>호구마 머신</h1>
      <NavBar />
    </header>

    <main>{children}</main>

    <footer>
      <span>Next.js</span>
    </footer>
  </>
)

export default Layout