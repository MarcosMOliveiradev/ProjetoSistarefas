CREATE TYPE "public"."origem_presenca" AS ENUM('SISTEMA', 'MANUAL');--> statement-breakpoint
CREATE TYPE "public"."selo" AS ENUM('VERDE', 'VERMELHO', 'DOURADO');--> statement-breakpoint
CREATE TYPE "public"."status_presenca" AS ENUM('PENDENTE', 'PRESENTE', 'ATRASADO', 'FALTA');--> statement-breakpoint
CREATE TYPE "public"."tipo_esperado" AS ENUM('EMPRESA', 'INSTITUICAO');--> statement-breakpoint
CREATE TYPE "public"."turno" AS ENUM('MANHA', 'TARDE');