import { Contact } from '../contact.model';
import { Action } from '@ngrx/store';

export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const SET_CONTACTS = 'SET_CONTACTS';
export const STORE_CONTACTS = 'STORE_CONTACTS';
export const STORE_CONTACTS_SUCCESS = 'STORE_CONTACTS_SUCCESS';
export const STORE_CONTACTS_ERROR = 'STORE_CONTACTS_ERROR';

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

export class FetchContacts implements Action {
  readonly type = FETCH_CONTACTS;
}

export class SetContacts implements Action {
  readonly type = SET_CONTACTS;

  constructor(public payload: Contact[]) {}
}

export class StoreContacts implements Action {
  readonly type = STORE_CONTACTS;
}

export class StoreContactsSuccess implements Action {
  readonly type = STORE_CONTACTS_SUCCESS;
  // constructor(public payload: boolean) {}
}

export class StoreContactsError implements Action {
  readonly type = STORE_CONTACTS_ERROR;
  // constructor(public payload: boolean) {}
}

export type ContactsActions =
  GetContacts |
  AddContact |
  AddContacts |
  FetchContacts |
  SetContacts |
  StoreContacts |
  StoreContactsSuccess |
  StoreContactsError;
