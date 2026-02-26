import { createId } from "@paralleldrive/cuid2";
import { Replace } from "../../lib/Replace.ts";

export interface IKanbanColaborador {
  kanbanId: string;
  userId: string;
  adicionadoEm: Date;
}

type CreateKanbanColaboradorProps = Replace<
  IKanbanColaborador,
  { adicionadoEm?: Date }
>;

export class KanbanColaborador {
  private props: IKanbanColaborador;
  private _id: string;

  private constructor(props: IKanbanColaborador, id?: string) {
    this._id = id ?? createId();
    this.props = props;
  }

  // ✅ Para criar novo vínculo (default data)
  static create(props: CreateKanbanColaboradorProps, id?: string) {
    return new KanbanColaborador(
      {
        ...props,
        adicionadoEm: props.adicionadoEm ?? new Date(),
      },
      id
    );
  }

  // ✅ Para reconstituir do banco
  static restore(props: IKanbanColaborador, id: string) {
    return new KanbanColaborador(props, id);
  }

  get id() {
    return this._id;
  }

  get kanbanId() {
    return this.props.kanbanId;
  }

  get userId() {
    return this.props.userId;
  }

  get adicionadoEm() {
    return this.props.adicionadoEm;
  }

  toJSON() {
    return {
      id: this._id,
      ...this.props,
    };
  }
}