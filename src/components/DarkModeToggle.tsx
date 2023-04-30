import { Moon, Sun } from '@carbon/icons-react'

import classes from './DarkModeToggle.module.scss'

export default function DarkModeButton() {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			document.documentElement.setAttribute('data-dark', '')
		} else {
			document.documentElement.removeAttribute('data-dark')
		}
	}

	return (
		<>
			<label className={classes.toggle}>
				<input type="checkbox" onChange={onChange} />
				<Moon className={classes.darkIcon}/>
				<Sun className={classes.lightIcon}/>
			</label>
		</>
	)
}
