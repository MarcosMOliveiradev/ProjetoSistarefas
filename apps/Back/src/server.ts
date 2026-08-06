import { app } from "./app.ts";
import { registerJobs } from "./application/useCase/grupos/function/index.ts";
import { env } from "./lib/env.ts";

registerJobs()

app.listen({
    host:'0.0.0.0',
    port:env.PORT,
}).then(() => {
    console.log(`🚀 Sever running in http://localhost:${env.PORT}`)
})