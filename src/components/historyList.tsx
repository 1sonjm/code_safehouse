import { SimpleGrid } from '@mantine/core'
import { useState } from 'react'

import HistoryCard, { History } from './hisotryCard'

export default function HistoryList({ column=4 }: { column?: number }) {
  const [hisotryList] = useState<Array<History>>([{words: '호구마', memberCount: 2, startNumber: 1}])

  return (
    <>
      <SimpleGrid cols={column}>
        <HistoryCard />
        {hisotryList.map((value, index)=>(
          <HistoryCard
            key={index}
            hisotry={value}
          />
        ))}
      </SimpleGrid>
    </>
  )
}
