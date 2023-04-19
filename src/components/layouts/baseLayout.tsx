import React from 'react'
import Head from 'next/head'
// import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { AppShell, Navbar, Header, Group, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Logo } from '../logo';
import { Add } from '@carbon/icons-react';

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = '호구마 머신' }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AppShell
        padding="md"
        header={
          <Header height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
              <Logo colorScheme={colorScheme} />
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <Add size={'glyph'} /> : <Add size={'glyph'} />}
              </ActionIcon>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </>
  )
}
export default Layout