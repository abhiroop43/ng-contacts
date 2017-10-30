import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NationalityService {
  getNationalities() {
    return this.httpClient
      .get('https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json')
      .map((nationalities: any[]) => {
        const cleanedData: INationality[] = new Array();
        for (const nat of nationalities) {
          const cleanedNat: INationality = {countryName: '', cioc: ''};
          cleanedNat.countryName = nat.name.common;
          cleanedNat.cioc = nat.cioc;
          cleanedData.push(cleanedNat);
        }
        return cleanedData;
      });
  }
  constructor(private httpClient: HttpClient) {}
}

export interface INationality {
  countryName: string;
  cioc: string;
}
