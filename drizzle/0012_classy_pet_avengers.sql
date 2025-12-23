ALTER TABLE "user_grupos"
ALTER COLUMN "data_inicio"
SET DATA TYPE date
USING data_inicio::date;
ALTER TABLE "user_grupos"
ALTER COLUMN "data_fim"
SET DATA TYPE date
USING data_inicio::date;