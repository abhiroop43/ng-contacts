import { Contact } from '../contact.model';
import * as ContactsActions from './contacts.action';

export interface IContactState {
  contacts: Contact[];
}

const initialState: IContactState = {
  contacts: []
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
    case ContactsActions.SEARCH_CONTACTS:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter(
            cnt =>
              cnt.firstname.toLowerCase().includes(action.payload) ||
              cnt.lastname.toLowerCase().includes(action.payload)
          )
        ]
      };
    case ContactsActions.UPDATE_CONTACT:
      const oldContact = state.contacts[action.payload.index];
      const updatedContact = {
        ...oldContact,
        ...action.payload.updateContact
      };
      const contacts = [...state.contacts];
      contacts[action.payload.index] = updatedContact;
      return {
        ...state,
        contacts: [...contacts]
      };
    case ContactsActions.DELETE_CONTACT:
      const oldContacts = state.contacts;
      const deletedContact = state.contacts.splice(action.payload, 1);
      return {
        ...state,
        contacts: [...oldContacts]
      };
    default:
      return state;
  }
}
