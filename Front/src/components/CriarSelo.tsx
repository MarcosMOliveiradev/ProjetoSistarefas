import type { usersDTO } from "@/dtos/userDto";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
interface Props {
  user: usersDTO[]
  onClose: () => void
}

const criarSeloSchema = z.object({
  mes: z.coerce.number().min(1).max(12),
  ano: z.coerce.number().min(2024),
})

export function CriarSelo({ onClose, user }: Props) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>("")

  const form = useForm<z.infer<typeof criarSeloSchema>>({
    resolver: zodResolver(criarSeloSchema),
    defaultValues: {
      mes: new Date().getMonth(),
      ano: new Date().getFullYear(),
    },
  })

  const criarSeloMutation = useMutation({
    mutationFn: async (dados: z.infer<typeof criarSeloSchema>) => {
      if (!usuarioSelecionado) {
        throw new Error("Selecione um usuário")
      }

      console.log(dados)

      await api.post("/analise/create", {
        userId: usuarioSelecionado,
        mes: dados.mes,
        ano: dados.ano,
      })
    },

    onSuccess: () => {
      toast.success("Selo criado com sucesso!")
      onClose()
    },

    onError: () => {
      toast.error("Erro ao criar selo")
    },
  })

  function handleCriarSelo(dados: z.infer<typeof criarSeloSchema>) {
    criarSeloMutation.mutate(dados)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Criar Selos</DialogHeader>

        {/* SELECT USUÁRIO */}
        <div className="w-full mb-4">
          <label className="text-sm font-medium">Selecionar usuário</label>

          <select
            className="w-full border p-2 rounded"
            value={usuarioSelecionado}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
          >
            <option value="">Selecione um usuário</option>

            {user.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCriarSelo)}
            className="grid grid-cols-2 gap-4"
          >
            {/* MÊS */}
            <FormField
              name="mes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecione o mês"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ANO */}
            <FormField
              name="ano"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecione o ano"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* BOTÃO */}
            <Button
              type="submit"
              className="col-span-2"
              disabled={criarSeloMutation.isPending}
            >
              {criarSeloMutation.isPending ? "Criando..." : "Salvar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}