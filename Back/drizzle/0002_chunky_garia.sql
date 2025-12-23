ALTER TABLE "user_grupos"
ALTER COLUMN "data_fim"
SET DATA TYPE date
USING data_fim::date;