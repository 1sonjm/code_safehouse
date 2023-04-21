import Head from 'next/head'
import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = '호구마 머신' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {children}
    </>
  )
}
export default Layout
