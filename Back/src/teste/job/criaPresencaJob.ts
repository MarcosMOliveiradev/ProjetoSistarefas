import { makeGeraPresencaDiaJob } from "../../application/useCase/grupos/factories/make-gera-presenca-dia-job.ts"

async function CriarPresenca() {
  const job = makeGeraPresencaDiaJob()

  const data = new Date()
  data.setUTCHours(0, 0, 0, 0)

  await job.execute(data)

  console.log("Job executado com sucesso")
}

CriarPresenca()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
})