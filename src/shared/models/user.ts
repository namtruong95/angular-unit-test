import { BaseModel } from './base';

export class User extends BaseModel {
  private _name: string;
  public get name(): string {
    return this._name || '';
  }
  public set name(v: string) {
    this._name = v;
  }

  constructor(d?: any) {
    super(d);

    if (d) {
      this.name = d.name;
    }
  }
}
