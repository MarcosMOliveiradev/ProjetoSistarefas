import { createId } from "@paralleldrive/cuid2"

import { Replace } from "../../lib/Replace.ts";

export interface IUser {
    name: string;
    matricula: number;
    password: string;
    avatarUrl: string | null | undefined;
    ativado: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class User {
    private props: IUser;
    private _id: string;

    constructor(props: Replace<IUser, { createdAt?: Date }>) {
        this._id = createId()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }
    }

    public get id(): string {
        return this._id;
    }

    public set name(name: string) {
        this.props.name = name;
    }
    public get name(): string {
        return this.props.name;
    }

    public set matricula(matricula: number) {
        this.props.matricula = matricula;
    }
    public get matricula(): number {
        return this.props.matricula;
    }

    public set ativado(ativado: boolean) {
        this.props.ativado = ativado
    }
    public get ativado() {
        return this.props.ativado
    }

    public set avata(avata: string | null | undefined) {
        this.props.avatarUrl = avata
    }
    public get avata(): string | null | undefined {
        return this.props.avatarUrl
    }
    
    public set password(password: string) {
        this.props.password = password;
    }
    public get password(): string {
        return this.props.password;
    }

    public set updateAt(update: Date | null | undefined) {
        this.props.updatedAt = update
    }

    public get updateAt(): Date | null | undefined {
        return this.props.updatedAt
    }

    public get createdAt(): Date {
        return this.props.createdAt
    }
}