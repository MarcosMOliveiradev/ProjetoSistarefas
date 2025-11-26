import { useEffect, useMemo, useState } from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { atividadesDTO } from "@/dtos/atividadesDTOS";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";

export function CodAtividades() {
  // filtro de ordenação
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);
  const [dados, setDados] = useState<atividadesDTO[]>([])
  const [search, setSearch] = useState("")
  
  // lista as atividades da api
  async function listAtividades() {
    const response = await api.get("/atividade/list")

    setDados(response.data)
  }
  useEffect(() => {
    listAtividades()
  }, []);

  function handleSort(col: string) {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
      return;
    }

    if (sortDir === "asc") {
      setSortDir("desc");
      return;
    }

    if (sortDir === "desc") {
      // terceira vez → remove ordenação
      setSortCol(null);
      setSortDir(null);
      return;
    }
  }

  const dadosFiltrados = useMemo(() => {
  if (!search) return dados;

  const termo = search.toLowerCase();

  return dados.filter((item) =>
    item.cod_atividade.toString().toLowerCase().includes(termo) ||
    item.setor.toLowerCase().includes(termo) ||
    item.descricao.toLowerCase().includes(termo)
  );
}, [dados, search]);

  const dadosOrdenados = useMemo(() => {
      const copia = [...dadosFiltrados];

      if (!sortCol || !sortDir) {
          return copia;
      }

      return copia.sort((a, b) => {
          let v1: any, v2: any;

          switch (sortCol) {
            
          case "descricao":
              v1 = a.descricao;
              v2 = b.descricao;
              return sortDir === "asc"
              ? v1.localeCompare(v2)
              : v2.localeCompare(v1);

          case "codAtividade":
              v1 = a.cod_atividade;
              v2 = b.cod_atividade;
              break;

          default:
              return 0;
          }

          return sortDir === "asc" ? v1 - v2 : v2 - v1;
      });
      }, [dadosFiltrados, sortCol, sortDir]);
  
  return (
    <DialogContent className="flex flex-col items-center h-[40rem] min-w-[50rem]">
      <DialogHeader>
        CÓDIGOS DE ATIVIDADES
      </DialogHeader>

      <Input
        className="w-[10rem] mb-2 p-2 border rounded"
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ScrollArea className="max-h-[30rem] items-center mt-4 mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[3rem] text-center cursor-pointer"
                onClick={() => handleSort("codAtividade")}
              >
                CÓD. ATIVIDADES {sortCol === "codAtividade" && (sortDir === "asc" ? "▲" : "▼")}
              </TableHead>
            
              <TableHead className="w-[10rem] text-center">
                SETOR
              </TableHead>

              <TableHead 
                className="w-[10rem] text-center cursor-pointer"
                onClick={() => handleSort("descricao")}
              >
                DESCRIÇÃO DA ATIVIDADE {sortCol === "descricao" && (sortDir === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead className="w-[3rem] text-center">TEMPO MÉDIO</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {
              dadosOrdenados.map((atividades: atividadesDTO) => (
                <TableRow className="text-center" key={atividades.cod_atividade}>
                  <TableCell>{atividades.cod_atividade}</TableCell>
                  <TableCell>{atividades.setor}</TableCell>
                  <TableCell>{atividades.descricao}</TableCell>
                  <TableCell>{atividades.tempo_medio}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </ScrollArea>
    </DialogContent>
  )
}