import cron from "node-cron";
import { makeFecharPresencasPendentes } from "../factories/make-fechar-presencas-pendentes.ts";

cron.schedule("20 17 * * *", async () => {
  const job = makeFecharPresencasPendentes();

  const hoje = new Date();
  hoje.setUTCHours(0, 0, 0, 0);

  await job.execute(hoje);

  console.log("Job executado com sucesso")
}, {
  timezone: "America/Sao_Paulo",
});