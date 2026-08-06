import { registerCriaPresencaJob } from './criaPresencaJob.ts'
import { registerFechaPresencaJob } from './fechaPresencaJob.ts'

export function registerJobs() {
  registerCriaPresencaJob()
  registerFechaPresencaJob()

  console.log('[CRON] Jobs registrados')
}