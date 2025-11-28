import { createId } from "@paralleldrive/cuid2";
import type { Replace } from "../../lib/Replace.ts";

export enum feedbackOptions {
  ANALIZANDO = 'ANALIZANDO',
  EM_ANDAMENTO = 'EM ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELDO = 'CANCELADO'
}
export interface IFeedback {
  conteudo: string
  status: feedbackOptions
  nome?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Feedback {
  private props: IFeedback;
  private _id: string;

  constructor(props: Replace<IFeedback, { createdAt?: Date }>) {
    this._id = createId();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get id(): string{
    return this._id;
  }

  public set conteudo(conteudo: string) {
    this.props.conteudo = conteudo;
  }
  public get conteudo(): string {
    return this.props.conteudo
  }

  public set status(status: feedbackOptions | undefined | null) {
    if (!status) {
      this.props.status = feedbackOptions.EM_ANDAMENTO;
    } else {
      this.props.status = status;
    }
  }
  public get status(): feedbackOptions {
    return this.props.status;
  }

  public set nome(nome: string | null | undefined) {
    this.props.nome = nome;
  }
  public get nome(): string | null | undefined {
    return this.props.nome;
  }

  public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | null | undefined {
        return this.props.updatedAt;
    }
    public set updatedAt(update: Date | null | undefined) {
        this.props.updatedAt = update;
    }
}