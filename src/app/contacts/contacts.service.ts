import {Injectable} from '@angular/core';
import {Contact} from './contact.model';

const STATIC_CONTACTS: Contact[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    mobile: '+12345678',
    home: '+45678912',
    work: '+6471223365',
    address: '123 St. Sample City'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    mobile: '+46151318',
    home: '+45678912',
    work: '+6471223365',
    address: '123 St. Test City'
  },
  {
    id: 1,
    firstName: 'Walter',
    lastName: 'White',
    mobile: '+12345678',
    home: '+45678912',
    work: '+6471223365',
    address: '123 St. Sample2 City'
  },
  {
    id: 1,
    firstName: 'Saul',
    lastName: 'Goodman',
    mobile: '+12345678',
    home: '+45678912',
    work: '+6471223365',
    address: '123 St. Test2 City'
  }
];

@Injectable()
export class ContactsService {

  getAll() {
    return STATIC_CONTACTS.slice();
  }

  getById(id: number) {
    return STATIC_CONTACTS.filter((contact: Contact) => contact.id === id).slice();
  }
}
