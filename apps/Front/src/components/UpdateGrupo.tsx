import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { gruposDTO } from "@/dtos/gruposDTO";

type UpdateGrupoProps = {
  id: string
  success: () => void
}

const diasSemana = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
]

const updateGrupoSchema = z.object({
  nome: z.string(),
  diasEmpresa: z.array(z.number().int().min(0).max(6)),
  diasInstituicao: z.array(z.number().int().min(0).max(6)),
  dataFim: z.date().nullable()
}) // ❌ não pode ter sobreposição
  .refine(
    (data) =>
      data.diasEmpresa.every(
        (dia) => !data.diasInstituicao.includes(dia)
      ),
    {
      message: "Um dia não pode ser Empresa e Instituição ao mesmo tempo",
      path: ["diasInstituicao"],
    }
  )
  // ❌ não pode os dois vazios
  .refine(
    (data) =>
      data.diasEmpresa.length > 0 || data.diasInstituicao.length > 0,
    {
      message:
        "O grupo precisa ter pelo menos dias na empresa ou na instituição",
      path: ["diasEmpresa"],
    }
  )
  // ⚠️ se um estiver vazio, o outro precisa ter 5 dias
  .refine(
    (data) => {
      if (data.diasEmpresa.length === 0) {
        return data.diasInstituicao.length === 5
      }

      if (data.diasInstituicao.length === 0) {
        return data.diasEmpresa.length === 5
      }

      return true
    },
    {
      message:
        "Se um tipo não tiver dias, o outro deve conter exatamente 5 dias",
      path: ["diasEmpresa"],
    }
  )

export function UpdateGrupo({ id, success }: UpdateGrupoProps) {
  const queryClient = useQueryClient()

  const { data: grupo } = useQuery<gruposDTO>({
    queryKey: ["grupos2", id],
    queryFn: async () => {
      const response = await api.get(`/grupos/findgrup/${id}`)
      return response.data
    }
  })

  const form = useForm<z.infer<typeof updateGrupoSchema>>({
    resolver: zodResolver(updateGrupoSchema),
    defaultValues: {
      nome: "",
      diasEmpresa: [],
      diasInstituicao: [],
    }
  })

  const updateGrupoMutation = useMutation({
    mutationFn: async (dados: z.infer<typeof updateGrupoSchema>) => {
      await api.patch(`/grupos/updategrupo`, {
        id,
        name: dados.nome,
        diasEmpresa: dados.diasEmpresa,
        diasInstituicao: dados.diasInstituicao,
      })
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["grupos"]
      })

      toast.success("Grupo atualizado")
      success()
    }
  })

  async function updateGrupo(
    dados: z.infer<typeof updateGrupoSchema>
  ) {
    try {
      await updateGrupoMutation.mutateAsync(dados)
    } catch {
      toast.error("Erro ao atualizar grupo")
    }
  }

  useEffect(() => {
    if (grupo) {
      form.reset({
        nome: grupo.nome,
        diasEmpresa: grupo.diasEmpresa ?? [],
        diasInstituicao: grupo.diasInstituicao ?? [],
        dataFim: grupo.dataFim
          ? new Date(grupo.dataFim)
          : null
      })
    }
  }, [grupo, form])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Atualizar Grupo
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(updateGrupo)}
        >
          <FormField
            name="nome"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Nome"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diasEmpresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Dias na Empresa
                </FormLabel>

                <div className="grid grid-cols-2 gap-2">
                  {diasSemana.map((dia) => (
                    <label
                      key={dia.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          field.value?.includes(
                            dia.value
                          ) ?? false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([
                              ...(field.value ?? []),
                              dia.value
                            ])
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (v) => v !== dia.value
                              )
                            )
                          }
                        }}
                      />

                      {dia.label}
                    </label>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diasInstituicao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Dias na Instituição
                </FormLabel>

                <div className="grid grid-cols-2 gap-2">
                  {diasSemana.map((dia) => (
                    <label
                      key={dia.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          field.value?.includes(
                            dia.value
                          ) ?? false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([
                              ...(field.value ?? []),
                              dia.value
                            ])
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (v) => v !== dia.value
                              )
                            )
                          }
                        }}
                      />

                      {dia.label}
                    </label>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 flex justify-end">
            <Button type="submit">
              SALVAR
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}