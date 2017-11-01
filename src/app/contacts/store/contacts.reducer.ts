import { Contact } from '../contact.model';
import * as ContactsActions from './contacts.action';

export interface IContactState {
  contacts: Contact[];
}

const initialState: IContactState = {
  contacts: [],
};

export function ContactsReducer(
  state: IContactState = initialState,
  action: ContactsActions.ContactsActions
) {
  switch (action.type) {
    case ContactsActions.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case ContactsActions.ADD_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload]
      };
    case ContactsActions.SET_CONTACTS:
      return {
        ...state,
        contacts: [...action.payload]
      };
    default:
      return state;
  }
}
