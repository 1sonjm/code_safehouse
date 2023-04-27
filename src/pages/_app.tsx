import '../styles/global.scss'

import { LogoGithub } from '@carbon/icons-react'
import {ActionIcon, AppShell, Burger, ColorScheme, ColorSchemeProvider, Container, createStyles, Group, Header, MantineProvider, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useState } from 'react'
import DarkModeButton from 'src/components/DarkModeToggle'
import { Logo } from 'src/components/Logo'

const HEADER_HEIGHT = rem(56)
const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles()

  const [siteLinks] = useState([
    { label: '소개', link: '/' },
    { label: '게임', link: '/playground/new' },
    { label: '진행이력', link: '/playground/history' },
  ])
  const [active, setActive] = useState(siteLinks[0].link)
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider>
        <AppShell
          padding="md"
          header={
            <Header height={HEADER_HEIGHT}>
              <Container className={classes.inner}>
                <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
                <Group className={classes.links} spacing={5}>
                  {siteLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.link}
                      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
                      onClick={(event) => {
                        setActive(link.link)
                      }}
                    >
                      {link.label}
                    </Link>
                  ))
                  }
                </Group>

                <Group>
                  <Link href="/" className={'titleLogo'}>
                    <Logo size={30} />
                  </Link>
                </Group>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                  <ActionIcon size={30}>
                    <LogoGithub />
                  </ActionIcon>
                  <ActionIcon size={30}>
                    <LogoGithub />
                  </ActionIcon>
                  <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    <DarkModeButton />
                  </ActionIcon>
                </Group>
              </Container>
            </Header>
          }
          styles={(theme) => ({
            root: {
              backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
