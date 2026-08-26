import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AppErrors } from "@/lib/appErrors";
import { toast } from "sonner";
import { api } from "@/lib/axios";

import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { findUser } from "@/api/findUser";
import type { userDTO } from "@/dtos/userDto";

const dataPickerSchema = z.object({
  dateRage: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type DataPickerSchema = z.infer<
  typeof dataPickerSchema
>;

function toBR(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

async function fetchTarefas(
  from: Date,
  to: Date,
  userIdConsulta: string
) {
  const startDate = toBR(from);
  const endDate = toBR(to);

  console.log("Consultando tarefas:", {
    startDate,
    endDate,
    userIdConsulta,
  });

  if (startDate === endDate) {
    const { data } = await api.post(
      "/tarefas/listaTarefas",
      {
        dataB: startDate,
        userId: userIdConsulta,
      }
    );

    return data.tarefas;
  }

  const { data } = await api.post(
    "/tarefas/listbyinterval",
    {
      startDate,
      endDate,
      userId: userIdConsulta,
    }
  );

  return data.tarefas;
}

export function DataPicker({
  onDadosTarefas,
}: {
  onDadosTarefas: (dados: any[]) => void;
}) {
  const queryClient = useQueryClient();

  const user =
    queryClient.getQueryData<userDTO>([
      "profile",
    ]);

  const isInformatica =
    user?.user_roles?.role === "INFORMATICA";

  const [
    usuarioSelecionado,
    setUsuarioSelecionado,
  ] = useState<string | null>(null);

  const { data: usuarios } = useQuery({
    queryKey: ["usuarios"],
    queryFn: findUser,
    enabled: isInformatica,
  });

  const userIdConsulta = isInformatica
    ? usuarioSelecionado
    : user?.user?.id;

  const form = useForm<DataPickerSchema>({
    resolver: zodResolver(
      dataPickerSchema
    ),

    defaultValues: {
      dateRage: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const [rangeKey, setRangeKey] =
    useState(() => {
      const now = new Date();

      return {
        from: now,
        to: now,
      };
    });

  const query = useQuery({
    queryKey: [
      "atividades",

      userIdConsulta,

      toBR(rangeKey.from),
      toBR(rangeKey.to),
    ],

    queryFn: () =>
      fetchTarefas(
        rangeKey.from,
        rangeKey.to,
        userIdConsulta!
      ),

    enabled: !!userIdConsulta,

    staleTime: 0,
  });

  useEffect(() => {
    if (!query.data) {
      return;
    }

    onDadosTarefas(query.data);
  }, [
    query.data,
    onDadosTarefas,
  ]);

  useEffect(() => {
    if (!query.isError) {
      return;
    }

    const err =
      query.error as any;

    const msg =
      err instanceof AppErrors
        ? err.message
        : err?.response?.data
            ?.message ??
          err?.message ??
          "Erro ao carregar tarefas";

    toast.error(msg);
  }, [
    query.isError,
    query.error,
  ]);

  function onSubmit(
    values: DataPickerSchema
  ) {
    setRangeKey(
      values.dateRage
    );
  }

  async function geraPDF() {
    const dateRange =
      form.getValues("dateRage");

    const startDate =
      toBR(dateRange.from);

    const endDate =
      toBR(dateRange.to);

    if (!userIdConsulta) {
      toast.error(
        "Selecione um usuário."
      );

      return;
    }

    try {
      const response =
        await api.post(
          "/tarefas/gerarPdf",
          {
            startDate,
            endDate,

            userId:
              userIdConsulta,
          },
          {
            responseType: "blob",
          }
        );

      const pdfBlob =
        new Blob(
          [response.data],
          {
            type: "application/pdf",
          }
        );

      const fileURL =
        URL.createObjectURL(
          pdfBlob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = fileURL;

      const nomeUsuario =
        isInformatica
          ? usuarios?.find(
              (u: any) =>
                u.id ===
                usuarioSelecionado
            )?.name
          : user?.user?.name;

      link.download = `${
        nomeUsuario ??
        "tarefas"
      }-${startDate}.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      URL.revokeObjectURL(
        fileURL
      );
    } catch (err) {
      console.error(
        "Erro ao gerar PDF:",
        err
      );

      toast.error(
        "Erro ao gerar PDF."
      );
    }
  }

  return (
    <div className="pl-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="flex flex-col gap-4 items-start"
        >
          <FormField
            control={form.control}
            name="dateRage"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Data
                </FormLabel>

                <Popover>
                  <PopoverTrigger
                    asChild
                  >
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-[14rem] pl-3 text-left font-normal",
                          !field.value
                            ?.from &&
                            "text-muted-foreground",
                          "bg-muted hover:bg-gray-800 hover:text-amber-50"
                        )}
                      >
                        {field.value
                          ?.from ? (
                          field.value
                            ?.to ? (
                            <>
                              {format(
                                field
                                  .value
                                  .from,
                                "dd/MM/yyyy"
                              )}

                              {" - "}

                              {format(
                                field
                                  .value
                                  .to,
                                "dd/MM/yyyy"
                              )}
                            </>
                          ) : (
                            format(
                              field
                                .value
                                .from,
                              "dd/MM/yyyy"
                            )
                          )
                        ) : (
                          "Selecione o período"
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto p-0 bg-muted text-muted-foreground"
                    align="start"
                  >
                    <Calendar
                      mode="range"
                      selected={
                        field.value
                      }
                      onSelect={
                        field.onChange
                      }
                      disabled={(
                        date
                      ) =>
                        date >
                          new Date() ||
                        date <
                          new Date(
                            "1900-01-01"
                          )
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {isInformatica && (
            <div className="w-[20rem]">
              <label className="text-sm font-medium">
                Selecionar usuário
              </label>

              <select
                className="w-full border p-2 rounded bg-background"
                value={
                  usuarioSelecionado ??
                  ""
                }
                onChange={(e) => {
                  const value =
                    e.target.value;

                  setUsuarioSelecionado(
                    value || null
                  );
                }}
              >
                <option value="">
                  Selecione um usuário
                </option>

                {usuarios?.map(
                  (u: any) => (
                    <option
                      key={u.id}
                      value={u.id}
                    >
                      {u.name}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
          <div className="flex gap-4">
            <Button
              className="
                hover:bg-muted
                w-[8rem]
                hover:text-muted-foreground
                hover:border-muted-foreground
                hover:border-2
                bg-cyan-700
                cursor-pointer
              "
              type="submit"
              disabled={
                query.isFetching ||
                (
                  isInformatica &&
                  !usuarioSelecionado
                )
              }
            >
              {query.isFetching
                ? "Carregando..."
                : "FILTRAR"}
            </Button>

            <Button
              type="button"
              className="
                cursor-pointer
                w-[8rem]
                bg-slate-700
                hover:bg-slate-400
              "
              disabled={
                query.isFetching ||
                (
                  isInformatica &&
                  !usuarioSelecionado
                )
              }
              onClick={
                geraPDF
              }
            >
              GERAR PDF
            </Button>

          </div>
        </form>
      </Form>
    </div>
  );
}