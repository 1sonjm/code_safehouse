import '../styles/global.scss'

import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import FooterLayout from 'src/components/layouts/FooterLayout'
import HeaderLayout from 'src/components/layouts/HeaderLayout'

function App({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider>
				<AppShell
					padding="0"
					style={{paddingTop: 'var(--header-height)'}}
					header={<HeaderLayout />}
					footer={<FooterLayout />}
				>
					<Component {...pageProps} />
				</AppShell>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default App
