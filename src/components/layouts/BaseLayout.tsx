import Head from 'next/head'
import React from 'react'

import classes from './BaseLayout.module.scss'

export default function Layout({ children, title = '호구마 머신' }:{
	children: React.ReactNode
	title?: string
}) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<div className={`${classes.content}`}>
				{children}
			</div>
		</>
	)
}
