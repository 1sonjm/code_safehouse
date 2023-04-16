import { useState } from 'react'
import { useRouter } from 'next/router'

import BaseLayout from '../../components/layouts/baseLayout'
import { ParsedUrlQueryInput } from 'node:querystring'

interface Query {
  words?: string,
  memberCount?: number,
  startNumber?: number,
}

export default function Home() {
  const router = useRouter()

  const [words, setWords] = useState('')
  const [memberCount, setMemberCount] = useState(2)
  const [startNumber, setStartNumber] = useState(1)

  const generateNewGame = () => {
    alert('게임을 생성합니다')
    const query: ParsedUrlQueryInput = {}
    if (words?.length){
      query.words = words
    }
    if (memberCount >= 2){
      query.memberCount = memberCount
    }
    if (startNumber >= 1){
      query.startNumber = startNumber
    }

    router.push({
      pathname: '/playground/game',
      query,
    })
  }

  return (
    <BaseLayout title='호구마 게임'>
      <input
        type="text"
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <input
        type="number"
        value={memberCount}
        onChange={(e) => setMemberCount(Number(e.target.value))}
      />
      <input
        type="number"
        value={startNumber}
        onChange={(e) => setStartNumber(Number(e.target.value))}
      />

      <button onClick={generateNewGame}>
        생성
      </button>
    </BaseLayout>
  )
}