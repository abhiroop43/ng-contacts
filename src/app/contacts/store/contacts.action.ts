import { Contact } from '../contact.model';
import { Action } from '@ngrx/store';

export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';
export const DELETE_CONTACTS = 'DELETE_CONTACTS';

export class GetContacts implements Action {
  readonly type = GET_CONTACTS;
}

export class AddContact implements Action {
  readonly type = ADD_CONTACT;

  constructor(public payload: Contact) {}
}

export class AddContacts implements Action {
  readonly type = ADD_CONTACTS;

  constructor(public payload: Contact[]) {}
}

export type ContactsActions =
GetContacts |
AddContact |
AddContacts;
