import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"


const dataPickerSchema = z.object({
    dataInicial: z.date(),
    dataFinal: z.date()
})

export function DataPicker() {
    const form = useForm<z.infer<typeof dataPickerSchema>>({
        resolver: zodResolver(dataPickerSchema),
        defaultValues: {
            dataInicial: new Date(),
            dataFinal: new Date(),
        }
    })

    function onSubmit(data: z.infer<typeof dataPickerSchema>) {
        console.log(data)
    }

    return (
        <div className="pl-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-center">
                    {/* Data Inicial */}
                    <FormField
                        control={form.control}
                        name="dataInicial"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Inicial</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                { format(field.value, "dd/MM/yyyy") }
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Selecione a data inicial das atividades.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Data Final */}
                    <FormField
                        control={form.control}
                        name="dataFinal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Final</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                { format(field.value, "dd/MM/yyyy")}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Selecione a data final das atividades.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="hover:bg-muted hover:text-muted-foreground hover:border-muted-foreground hover:border-2" type="submit">Filtrar</Button>
                </form>
            </Form>
        </div>
    )
}