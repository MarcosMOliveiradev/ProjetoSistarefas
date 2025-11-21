import { createId } from "@paralleldrive/cuid2"

import { Replace } from '../../lib/Replace.ts'

export enum CategoryEnum {
    COMPRAS = 'COMPRAS',
    ALMOXARIFADO = 'ALMOXARIFADO',
    SECRETARIA = 'SECRETARIA',
    FINANCEIRO = 'FINANCEIRO',
    DP = 'DP',
    INFORMATICA = 'INFORMATICA',
    PONTO = 'PONTO',
    SEMAC = 'SEMAC',
    SEMAL = 'SEMAL',
    PCM = 'PCM',
    PJA = 'PJA',
    OUTROS = 'OUTROS',
}

export interface IMedia {
    name: string;
    description?: string;
    category: CategoryEnum;
    createdAt: Date;
    updatedAt?: Date | null;

    costumerId: string;
}

export class Media {
    private props: IMedia;
    private _id: string;

    constructor(propos: Replace<IMedia, { createdAt?: Date }>) {
        this._id = createId();
        this.props = {
            ...propos,
            createdAt: propos.createdAt ?? new Date(),
        };
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

    public set description(description: string | undefined) {
        this.props.description = description;
    }
    public get description(): string | undefined {
        return this.props.description;
    }

    public set category(category: CategoryEnum) {
        this.props.category = category;
    }
    public get category(): CategoryEnum {
        return this.props.category;
    }

    public set costumerId(costumerId: string) {
        this.props.costumerId = costumerId;
    }
    public get costumerId(): string {
        return this.props.costumerId;
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