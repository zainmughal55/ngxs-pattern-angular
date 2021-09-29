import { IModelFunctions, ModelProperty } from './prop/model.dec';

export class User implements IModelFunctions {

  setModelValues: (any) => User;
  getModelValues: () => any;

  @ModelProperty('user_name')
  userName: string;
  @ModelProperty()
  email: string;

  constructor(payload: any) {
    this.setModelValues(payload);
  }

}