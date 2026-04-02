import { useState } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { CirclePlay } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { toast } from "sonner";

const video = z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['TODOS', 'COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS',]),
    roles: z.enum(['TODOS', 'COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS',])
})

export function UpLoadVideos() {
    const [preview, setPreview] = useState<string | null>(null)
    const [url, setUrl] = useState<string | null>(null)

    const form = useForm<z.infer<typeof video>>({
        resolver: zodResolver(video)
    })

    const mutationVideo = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append("file", file)

            const { data } = await api.post('/media/file', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            return data
        }
    })

    const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if(!file) return;

            const previewURL = URL.createObjectURL(file)
            setPreview(previewURL)

            const videoUrl = await mutationVideo.mutateAsync(file)
            setUrl(videoUrl)
        } catch (error) {
            toast.error("Erro ao carregar o vídeo. Tente novamente.")
        }
    }

    const uploadVideoMutation = useMutation({
        mutationFn: async (data: z.infer<typeof video>) => {
            await api.post('/media/create', {
                titulo: data.title,
                description: data.description,
                category: data.category,
                roleBody: data.roles,
                url: url
            })
        },

        onSuccess: async () => {
            toast.success("Vídeo enviado com sucesso!")
            form.reset()
            setPreview(null)
        }
    })

    async function handleUploadVideo(data: z.infer<typeof video>) {
        try {
            await uploadVideoMutation.mutateAsync(data)
        } catch (error) {
            toast.error("Erro ao enviar o vídeo. Tente novamente.")
        }
    } 
    return (
        <DialogContent className="flex flex-col bg-muted text-muted-foreground">
            <DialogHeader className="flex flex-col justify-center items-center">
                <DialogTitle>Upload de videos</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(handleUploadVideo)}>
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Titulo</FormLabel>
                                <FormControl>
                                    <Input id="titulo" placeholder="Como fazer ordem de compra" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    {/* Categoria */}
                    <FormField
                            name="category"
                            control={form.control}
                            render={({ field}) => (
                                <FormItem className="">
                                    <FormLabel>Selecione a categoria</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="COMPRAS">COMPRAS</SelectItem>
                                            <SelectItem value="ALMOXARIFADO">ALMOXARIFADO</SelectItem>
                                            <SelectItem value="SECRETARIA">SECRETARIA</SelectItem>
                                            <SelectItem value="FINANCEIRO">FINANCEIRO</SelectItem>
                                            <SelectItem value="DP">DP</SelectItem>
                                            <SelectItem value="INFORMATICA">INFORMATICA</SelectItem>
                                            <SelectItem value="PONTO">PONTO</SelectItem>
                                            <SelectItem value="SEMAC">SEMAC</SelectItem>
                                            <SelectItem value="SEMEL">SEMEL</SelectItem>
                                            <SelectItem value="PCM">PCM</SelectItem>
                                            <SelectItem value="PJA">PJA</SelectItem>
                                            <SelectItem value="OUTROS">OUTROS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                    {/* Roles */}
                    <FormField
                            name="roles"
                            control={form.control}
                            render={({ field}) => (
                                <FormItem className="">
                                    <FormLabel>Selecione as permições</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="TODOS">TODOS</SelectItem>
                                            <SelectItem value="COMPRAS">COMPRAS</SelectItem>
                                            <SelectItem value="ALMOXARIFADO">ALMOXARIFADO</SelectItem>
                                            <SelectItem value="SECRETARIA">SECRETARIA</SelectItem>
                                            <SelectItem value="FINANCEIRO">FINANCEIRO</SelectItem>
                                            <SelectItem value="DP">DP</SelectItem>
                                            <SelectItem value="INFORMATICA">INFORMATICA</SelectItem>
                                            <SelectItem value="PONTO">PONTO</SelectItem>
                                            <SelectItem value="SEMAC">SEMAC</SelectItem>
                                            <SelectItem value="SEMEL">SEMEL</SelectItem>
                                            <SelectItem value="PCM">PCM</SelectItem>
                                            <SelectItem value="PJA">PJA</SelectItem>
                                            <SelectItem value="OUTROS">OUTROS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea id="description" placeholder="Descrição do vídeo" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <div className="col-span-2">
                        <label htmlFor="video" className="flex flex-col justify-center items-center gap-2 cursor-pointer border-2 border-muted rounded-md p-4">
                            Videos
                            {preview 
                                ? <img src={preview} alt="Preview" className="w-10 h-10" /> 
                                : <CirclePlay className="w-10 h-10" />
                            }
                            
                            <Input 
                                className="hidden" 
                                id="video"
                                accept="video/*"
                                name="video" 
                                type="file"
                                onChange={uploadVideo}
                            />
                        </label>
                    </div>

                    <Button type="submit" className="bg-gray-800 cursor-pointer">ENVIAR</Button>
                    <Button type="reset" className="border-red-500 text-muted-foreground cursor-pointer" variant={"outline"}>CANCELAR</Button>
                </form>
            </Form>
        </DialogContent>
    )
}