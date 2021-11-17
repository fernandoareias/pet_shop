export class Address {
  constructor(
    public zipcode: string,
    public street: string,
    // tslint:disable-next-line:variable-name
    public number: string,
    public complement: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public country: string,
  ) {}
}
