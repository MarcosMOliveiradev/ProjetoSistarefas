import { app } from "./app.ts";
import { registerJobs } from "./application/useCase/grupos/function/index.ts";
import { env } from "./lib/env.ts";

async function start() {
  try {
    registerJobs();

    const address = await app.listen({
      host: "0.0.0.0",
      port: env.PORT,
    });

    app.log.info(`Server running at ${address}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();