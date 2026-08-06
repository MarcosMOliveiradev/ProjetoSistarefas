import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import z from "zod";

export const dataPickerSchema = z.object({
    dateRage: z.object({
        from: z.date(),
        to: z.date()
    }),
})

export function DataPicker({ onDadosTarefas }: any) {
    const form = useForm<z.infer<typeof dataPickerSchema>>({
        resolver: zodResolver(dataPickerSchema),
        defaultValues: {
            dateRage: {
                from: new Date(),
                to: new Date(),
            },
        }
    })

    return (
        <div className="pl-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onDadosTarefas)} className="flex gap-4 items-center ">
                    {/* Data Inicial */}
                    <FormField
                        control={form.control}
                        name="dateRage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                "w-[14rem] pl-3 text-left font-normal",
                                                !field.value?.from && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                <>
                                                    {format(field.value.from, "dd/MM/yyyy")} -{" "}
                                                    {format(field.value.to, "dd/MM/yyyy")}
                                                </>
                                                ) : (
                                                format(field.value.from, "dd/MM/yyyy")
                                                )
                                            ) : (
                                                "Selecione o período"
                                            )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                        <Calendar
                                            mode="range"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Selecione a data.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="hover:bg-muted w-[8rem] hover:text-muted-foreground hover:border-muted-foreground hover:border-2 bg-cyan-700 cursor-pointer" type="submit">Filtrar</Button>
                </form>
            </Form>
        </div>
    )
}