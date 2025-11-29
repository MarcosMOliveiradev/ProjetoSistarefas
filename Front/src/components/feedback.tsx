import { MessageCircleCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppErrors } from "@/lib/appErrors";
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

const feedbackSchema = z.object({
  conteudo: z.string().refine((data) => data.length > 1, {error: "Campo obrigatório!"}),
  nome: z.string().optional()
})

export function Feedback() {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema)
  })

  async function createFeedback({ conteudo, nome }: z.infer<typeof feedbackSchema>) {
    try {
      const response = await api.post('/feedback/create', {
        conteudo,
        nome
      })

      if( response.status === 201 ) {
        toast.success(response.data.message)
      }
    } catch (err) {
      const isAppError = err instanceof AppErrors
      const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

      toast.error(title)
    }
  }

  return (
    <Dialog>
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
              <Button className="w-[10rem] bg-slate-700 hover:bg-slate-400 mt-4" type="submit">SALVAR</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}