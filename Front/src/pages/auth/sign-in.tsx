import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { AppErrors } from "@/lib/appErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const logInSchema = z.object({
  matriculaBody: z.string(),
  passwordBody: z.string()
})

export function SignIn() {

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema)
  })
  const { signIg } = useAuth()

  async function logIn({ matriculaBody, passwordBody }: z.infer<typeof logInSchema>) {
    const matricula = parseInt(matriculaBody)

    try {
      await signIg(matricula, passwordBody)
    } catch (err) {
      const isAppError = err instanceof AppErrors
      const title = isAppError ? err.message : 'Não foi possivel efetuar o log in. Tente novamente mais tarde'

      toast.error(title)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 px-4">
      <Helmet title="Sign In"/>

     <div className="flex flex-col justify-center items-center h-[35rem] w-[35rem] border-2 rounded-md shadow-xl/30">

       <h2 className="text-[3rem] font-bold font-sans">W Engenharia</h2>
        <p className="text-[1.5rem] font-bold font-serif">PJA Sistarefas Web</p>

        <Form {...form}>
          <form className="flex flex-col gap-4 w-[20rem] rounded-sm" onSubmit={form.handleSubmit(logIn)}>
            <div>
              <FormField
                name="matriculaBody"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.5rem]">Matricula</FormLabel>
                    <FormControl>
                      <Input id="matriculaBody" placeholder="Matricula" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                name="passwordBody"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel  className="text-[1.5rem]">Senha</FormLabel>
                    <FormControl>
                      <Input id="passwordBody" placeholder="Senha" type="password" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full bg-muted-foreground hover:bg-muted-foreground/80 cursor-pointer" type="submit">ENTRAR</Button>
          </form>
        </Form>
     </div>
    </div>
  )
}