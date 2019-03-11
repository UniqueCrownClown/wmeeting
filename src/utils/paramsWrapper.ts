export default class ParamsWrapper {
  private returnParams: string;
  constructor(params: RegisterParams | LoginParams) {
    for (let prop in params) {
      console.log('params.' + prop + ' = ' + params[prop]);
      this.returnParams += `${prop}=${params[prop]}&`;
    }
  }
  public getValues() {
    return this.returnParams;
  }
}
