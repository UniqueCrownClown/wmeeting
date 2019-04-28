export default class ParamsWrapper {
  private returnParams: string = '';
  constructor(params: any) {
    for (let prop in params) {
      this.returnParams += `${prop}=${params[prop]}&`;
    }
  }
  public getValues() {
    return this.returnParams.substring(0,this.returnParams.length-1);
  }
}
