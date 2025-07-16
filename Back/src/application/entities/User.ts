import { createId } from "@paralleldrive/cuid2"

import { Replace } from "../../lib/Replace.ts";

export interface IUser {
    name: string;
    matricula: string;
    email: string;
    password: string;
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

    public set matricula(matricula: string) {
        this.props.matricula = matricula;
    }
    public get matricula(): string {
        return this.props.matricula;
    }

    public set email(email: string) {
        this.props.email = email;
    }
    public get email(): string {
        return this.props.email;
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