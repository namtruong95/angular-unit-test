export interface BaseInterface {
  id: number;
}

export class BaseModel {

  private _id: number;
  public get id(): number {
    return this._id || null;
  }
  public set id(v: number) {
    this._id = v;
  }

  constructor(d?: BaseInterface) {
    if (d) {
      this.id = d.id;
    }
  }
}
