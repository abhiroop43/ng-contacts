import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';
import * as ContactsActions from './contacts.action';

export interface IContactState {
  contacts: Contact[];
}

const initialState: IContactState = {
  contacts: [
    {
      gender: 'female',
      name: {
        title: 'mrs',
        first: 'michelle',
        last: 'watkins'
      },
      location: {
        street: '7588 the green',
        city: 'winchester',
        state: 'isle of wight',
        postcode: 'V91 5YY'
      },
      email: 'michelle.watkins@example.com',
      dob: '1987-02-23 12:29:27',
      phone: '0181 003 7464',
      cell: '0724-984-228',
      id: {
        name: 'NINO'
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/32.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/32.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/32.jpg'
      },
      nat: 'GB'
    }
  ]
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
    default:
      return state;
  }
}
