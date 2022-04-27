import { randomUUID } from 'crypto'
import { rateLimit } from 'express-rate-limit'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
  }
  messages.push(message)
  return message
}

const limiter = rateLimit({
})


/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      if(data.pseudo.length > 15 || data.body.length > 144){
      return
      }
      
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

  app.get('/history', (request, reply) => {
    reply.send(messages.slice(-30))
  })
}
