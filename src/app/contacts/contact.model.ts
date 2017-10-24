export class Contact {
  constructor(public id: {name: string},
              public name: {title: string, first: string, last: string},
              public cell: string,
              public phone: string,
              public location: {street: string, city: string, state: string, postcode: string},
              public gender: string,
              public email: string,
              public dob: string,
              public picture: {large: string, medium: string, thumbnail: string},
              public nat: string) {}
}
