import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'

export interface History {
  words: string
  memberCount: number
  startNumber: number
}

export default function HistoryCard({ hisotry }: { hisotry?: History }) {
  return (
    <>
      {hisotry!=undefined ?
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
              {hisotry.words}
            </Text>
            <Badge color="pink" variant="light">
              {hisotry.memberCount}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {hisotry.startNumber}
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
          </Button>
        </Card>
        :
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
              신규
            </Text>
            <Badge color="pink" variant="light">
              신규1
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            신규2
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
          </Button>
        </Card>
      }
    </>
  )
}
