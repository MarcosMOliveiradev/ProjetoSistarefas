import cron from 'node-cron'
import { makeGeraPresencaDiaJob } from '../factories/make-gera-presenca-dia-job.ts'

cron.schedule("30 6 * * *", async() => {
  const hoje = new Date()
  hoje.setUTCHours(0, 0, 0, 0)

  const job = makeGeraPresencaDiaJob()
  await job.execute(hoje)
}, {
  timezone: "America/Sao_Paulo",
})