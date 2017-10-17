export class Contact {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public mobile: string,
              public home?: string,
              public work?: string,
              public address?: string) {}
}
