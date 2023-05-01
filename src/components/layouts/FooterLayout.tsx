import Link from 'next/link'

import classes from './FooterLayout.module.scss'

export default function FooterLayout ({}) {

	return (
		<>
			<footer className={`${classes.footer}`}>
				<p>github:
					<Link
						href='https://github.com/1sonjm'
						target="_blank"
						rel="noopener noreferrer"
					> sonjm1758</Link>
				</p>
				<p>Copyright 2023. sonjm1758 all rights reserved.</p>
			</footer>
		</>
	)
}
