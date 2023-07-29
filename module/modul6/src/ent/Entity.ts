import { TEntity, EType } from "../skema.js";

export class EntityObj implements TEntity {
    protected _id: number = 0;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    protected _type: EType;
    public get type(): EType {
        return this._type;
    }
    public set type(value: EType) {
        this._type = value;
    }

    protected _indukId: number;
    public get indukId(): number {
        return this._indukId;
    }
    public set indukId(value: number) {
        this._indukId = value;
    }

    protected _nama: string;
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
}

class Entity {

}

export const entity = new Entity();
