import { makeFecharPresencasPendentes } from "../../application/useCase/grupos/factories/make-fechar-presencas-pendentes.ts"

async function test() {
  const job = makeFecharPresencasPendentes()

  const data = new Date()
  data.setUTCHours(0, 0, 0, 0)

  await job.execute(data)

  console.log("Job executado com sucesso")
}

test()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
})