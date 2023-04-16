import Link from 'next/link'

export default function NavBar() {
  // const date = parseISO(dateString)

  return (
    <menu>
      <li>
        <Link href={'/playground/new'}>게임</Link>
      </li>
    </menu>
  )
}