import { MessageCircleCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

const feedbackSchema = z.object({
  nome: z.string().optional(),
  conteudo: z.string().refine((data) => data.length > 1, {error: "Campo obrigatório!"}),
})

export function Feedback() {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema)
  })
  const [open, setOpen] = useState(false)

  const createFeedbackMutation = useMutation({
    mutationFn: async (data: z.infer<typeof feedbackSchema>) => {
      return await api.post('/feedback/create', {
        nome: data.nome,
        conteudo: data.conteudo
      })
    },
    onSuccess: () => {
      toast.success("Feedback Criado com sucesso.")
      queryClient.invalidateQueries({queryKey: ["feedbacks"]})
      form.reset()
      setOpen(false)
    },
    onError: () => {
      toast.error("Não foi possivel criar o feedback.")
    }
  })

  async function createFeedback(data: z.infer<typeof feedbackSchema>) {
    createFeedbackMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer fixed bottom-6 right-6 z-50 bg-cyan-900 hover:cyan-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-allactive:scale-95">
          <MessageCircleCode/>
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col text-center w-full">
        <DialogHeader>
          <DialogTitle>FEEDBACK</DialogTitle>
        </DialogHeader>
        <Form {...form}>

          <form className="mt-4" onSubmit={form.handleSubmit(createFeedback)}>

            <FormField 
              name="nome"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      id="nome"
                      placeholder="Nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              name="conteudo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Conteudo:</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[8rem]"
                      id="conteudo"
                      placeholder="Conteudo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="grid col-start-2 col-span-2 justify-end">
              <Button 
                className="flex justify-center items-center w-[10rem] bg-slate-700 hover:bg-slate-400 mt-4"
                type="submit"
                disabled={createFeedbackMutation.isPending}
              >{createFeedbackMutation.isPending ? <Spinner/> : "SALVAR"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}