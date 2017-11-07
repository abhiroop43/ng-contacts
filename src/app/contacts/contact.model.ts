export class Contact {
  constructor(
    public title: string,
    public firstname: string,
    public lastname: string,
    public cell: string,
    public phone: string,
    public location: {
      street: string;
      city: string;
      state: string;
      postcode: string;
    },
    public gender: string,
    public email: string,
    public dob: Date,
    public photo: string,
    public nat: string
  ) {}
}
