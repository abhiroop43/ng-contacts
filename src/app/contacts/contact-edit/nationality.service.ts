import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NationalityService {
  getNationalities() {
    return this.httpClient
      .get<INationality[]>('https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json');
  }
  constructor(private httpClient: HttpClient) {}
}

export interface INationality {
  name: {common: string};
  cioc: string;
}
