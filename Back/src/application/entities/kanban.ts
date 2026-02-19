import { createId } from "@paralleldrive/cuid2"
import { Replace } from "../../lib/Replace.ts";
import { kanbanStatusEnum } from "./Roles.ts";

export interface IKanbanProps {
  titulo: string;
  codAtividades: number; // singular (é um código)
  descricao: string;

  status: kanbanStatusEnum;

  criadoPor: string;
  criadoEm: Date;

  iniciadoPor?: string | null;
  iniciadoEm?: Date | null;

  finalizadoPor?: string | null;
  finalizadoEm?: Date | null;

  canceladoPor?: string | null;
  canceladoEm?: Date | null;
  motivoCancelamento?: string | null;
}

type CreateKanbanProps = Replace<
  IKanbanProps,
  {
    status?: kanbanStatusEnum;
    criadoEm?: Date;
    iniciadoPor?: string | null;
    iniciadoEm?: Date | null;
    finalizadoPor?: string | null;
    finalizadoEm?: Date | null;
    canceladoPor?: string | null;
    canceladoEm?: Date | null;
    motivoCancelamento?: string | null;
  }
>;

export class Kanban {
  private props: IKanbanProps
  private _id: string

  private constructor(props: IKanbanProps, id?: string) {
    this._id = id ?? createId();
    this.props = props;
  }

  static create(props: CreateKanbanProps, id?: string) {
    return new Kanban(
      {
        ...props,
        status: props.status ?? kanbanStatusEnum.TODO,
        criadoEm: props.criadoEm ?? new Date(),

        iniciadoPor: props.iniciadoPor ?? null,
        iniciadoEm: props.iniciadoEm ?? null,

        finalizadoPor: props.finalizadoPor ?? null,
        finalizadoEm: props.finalizadoEm ?? null,

        canceladoPor: props.canceladoPor ?? null,
        canceladoEm: props.canceladoEm ?? null,
        motivoCancelamento: props.motivoCancelamento ?? null,
      },
      id
    );
  }

  static restore(props: IKanbanProps, id: string) {
    return new Kanban(props, id);
  }

  get id() {
    return this._id;
  }

  get titulo() {
    return this.props.titulo;
  }

  get codAtividades() {
    return this.props.codAtividades;
  }

  get descricao() {
    return this.props.descricao;
  }

  get status() {
    return this.props.status;
  }

  get criadoPor() {
    return this.props.criadoPor;
  }

  get criadoEm() {
    return this.props.criadoEm;
  }

  get iniciadoPor() {
    return this.props.iniciadoPor ?? null;
  }

  get iniciadoEm() {
    return this.props.iniciadoEm ?? null;
  }

  get finalizadoPor() {
    return this.props.finalizadoPor ?? null;
  }

  get finalizadoEm() {
    return this.props.finalizadoEm ?? null;
  }

  get canceladoPor() {
    return this.props.canceladoPor ?? null;
  }

  get canceladoEm() {
    return this.props.canceladoEm ?? null;
  }

  get motivoCancelamento() {
    return this.props.motivoCancelamento ?? null;
  }

  start(userId: string, at: Date = new Date()) {
    if (this.props.status === kanbanStatusEnum.DONE)
      throw new Error("Atividade já finalizada; não pode iniciar.");
    if (this.props.status === kanbanStatusEnum.CANCELED)
      throw new Error("Atividade cancelada; não pode iniciar.");

    // se já estava em progresso, não reescreve o primeiro iniciador
    if (this.props.status === kanbanStatusEnum.IN_PROGRESS) return;

    this.props.status = kanbanStatusEnum.IN_PROGRESS;

    // primeiro iniciador apenas
    if (!this.props.iniciadoEm) {
      this.props.iniciadoPor = userId;
      this.props.iniciadoEm = at;
    }
  }

  finish(userId: string, at: Date = new Date()) {
    if (this.props.status === kanbanStatusEnum.DONE) return; // idempotente
    if (this.props.status === kanbanStatusEnum.CANCELED)
      throw new Error("Atividade cancelada; não pode finalizar.");

    // se estava TODO e alguém finaliza direto, você decide se permite:
    // eu permitiria, mas garantindo iniciadoEm (opcional)
    if (!this.props.iniciadoEm) {
      this.props.iniciadoPor = this.props.iniciadoPor ?? userId;
      this.props.iniciadoEm = this.props.iniciadoEm ?? at;
      this.props.status = kanbanStatusEnum.IN_PROGRESS;
    }

    this.props.status = kanbanStatusEnum.DONE;
    this.props.finalizadoPor = userId;
    this.props.finalizadoEm = at;

    // cancelamento não faz sentido após done
    this.props.canceladoPor = null;
    this.props.canceladoEm = null;
    this.props.motivoCancelamento = null;
  }

  cancel(userId: string, motivo?: string | null, at: Date = new Date()) {
    if (this.props.status === "DONE")
      throw new Error("Atividade já finalizada; não pode cancelar.");
    if (this.props.status === kanbanStatusEnum.CANCELED) return; // idempotente

    this.props.status = kanbanStatusEnum.CANCELED;
    this.props.canceladoPor = userId;
    this.props.canceladoEm = at;
    this.props.motivoCancelamento = motivo ?? null;

    // garantir coerência
    this.props.finalizadoPor = null;
    this.props.finalizadoEm = null;
  }

   toJSON() {
    return {
      id: this._id,
      ...this.props,
    };
  }
}