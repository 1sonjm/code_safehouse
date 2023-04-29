import { Moon, Sun } from '@carbon/icons-react'

import classes from './DarkModeToggle.module.scss'

export default function DarkModeButton() {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			document.documentElement.setAttribute('data-theme', 'dark')
		} else {
			document.documentElement.setAttribute('data-theme', 'light')
		}
	}

	return (
		<>
			<label  className={classes.toggle}>
				<input type="checkbox" onChange={onChange} />
				<Moon className={classes.darkIcon}/>
				<Sun className={classes.lightIcon}/>
			</label>
		</>
	)
}
