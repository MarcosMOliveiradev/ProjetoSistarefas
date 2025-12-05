export interface CountDepartment {
  setor: string
  total: number
}

export interface CountCodigo {
  codigo: number,
  total: number
}

export interface ContagemTotal {
  total: number
}

export interface TopFiveCod {
    atividades: number | null;
    nome: string;
    total: number;
}

export interface Meses {
    mes: string;
    total: number;
}