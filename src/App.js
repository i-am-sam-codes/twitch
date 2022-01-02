
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
} from 'stream-chat-react'
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer'
import '@stream-io/stream-chat-css/dist/css/index.css'

const filters = { type: 'messaging' }
const options = { state: true, presence: true, limit: 10 }
const sort = { last_message_at: -1 }

const client = StreamChat.getInstance('gk27446t9mm9')

const App = () => {
  const [clientReady, setClientReady] = useState(false)
  const [channel, setChannel] = useState(null)
  const authToken = true

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'dave-matthews',
            name: 'Dave Matthews',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.XmZDz4kzn8GsDLh8EIkkaoy60F6JeBhZ8A9dXzALqO0',
        )
        const channel = await client.channel('gaming', 'gaming-demo', {
          name: 'Gaming Demo',
        })
        setChannel(channel)

        setClientReady(true)
      } catch (err) {
        console.log(err)
      }
    }

    setupClient()
  }, [])

  if (!clientReady) return null

  return (
    <>
    {!authToken && <Auth/>}
    {authToken && <Chat client={client} darkMode={true}>
      <Channel channel={channel}>
        <MessagingContainer/>
        
      </Channel>
    </Chat>}
    </>
  )
}

export default App