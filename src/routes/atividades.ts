import { FastifyInstance } from 'fastify'
import { CreatedActivyController } from '../controllers/CreatedActivyController'
import { GetActivyController } from '../controllers/GetActivyControllers'

export async function atividades(app: FastifyInstance) {
  app.post('/', new CreatedActivyController().activy)

  app.get('/', new GetActivyController().activyGet)

  app.get('/:id', new GetActivyController().getActivyForId)

  app.get('/data', new GetActivyController().getActivyForDate)

  app.get('/intervalData', new GetActivyController().getActivyIntevalDate)
}
