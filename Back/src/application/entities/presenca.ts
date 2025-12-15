import { createId } from "@paralleldrive/cuid2";
import { Replace } from "../../lib/Replace.ts";
import { origemPresencaEnum, statusPresencaEnum, tipoEsperadoEnum } from "./Roles.ts";

export interface IPresenca {
    userId: string;
    data: Date
    tipoEsperado: tipoEsperadoEnum
    status: statusPresencaEnum
    horaEntrada?: string
    origem: origemPresencaEnum
}

export class Presenca {
    private props: IPresenca;
    private _id: string;
    constructor(props: IPresenca) {
        this._id = createId();
        this.props = {
            ...props,
        };
    }

    public get id() {
        return this._id;
    }

    public get userId() {
        return this.props.userId;
    }
    public set userId(userId: string) {
        this.props.userId = userId;
    }

    public get data() {
        return this.props.data;
    }
    public set data(data: Date) {
        this.props.data = data;
    }

    public get tipoEsperado() {
        return this.props.tipoEsperado;
    }
    public set tipoEsperado(tipoEsperado: tipoEsperadoEnum) {
        this.props.tipoEsperado = tipoEsperado;
    }

    public get status() {
        return this.props.status;
    }
    public set status(status: statusPresencaEnum) {
        this.props.status = status;
    }

    public get horaEntrada() {
        return this.props.horaEntrada;
    }
    public set horaEntrada(horaEntrada: string | undefined) {
        this.props.horaEntrada = horaEntrada;
    }

    public get origem() {
        return this.props.origem;
    }
    public set origem(origem: origemPresencaEnum) {
        this.props.origem = origem;
    }
}