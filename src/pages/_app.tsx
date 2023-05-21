import '../styles/global.scss'

import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import FooterLayout from 'src/components/layouts/FooterLayout'

function App({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	return (
		<RecoilRoot>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider>
					<AppShell
						padding="0"
						footer={<FooterLayout />}
					>
						<Component {...pageProps} />
					</AppShell>
				</MantineProvider>
			</ColorSchemeProvider>
		</RecoilRoot>
	)
}

export default App
