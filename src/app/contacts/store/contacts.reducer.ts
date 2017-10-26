import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';
import * as ContactsActions from './contacts.action';

export interface IContactState {
  contacts: Contact[];
}

// const initialState: IContactState = {
//   contacts: [
//     {
//       gender: 'female',
//       title: 'mrs',
//       firstname: 'michelle',
//       lastname: 'watkins',
//       location: {
//         street: '7588 the green',
//         city: 'winchester',
//         state: 'isle of wight',
//         postcode: 'V91 5YY'
//       },
//       email: 'michelle.watkins@example.com',
//       dob: '1987-02-23 12:29:27',
//       phone: '0181 003 7464',
//       cell: '0724-984-228',
//       photo: 'https://randomuser.me/api/portraits/women/32.jpg',
//       nat: 'GB'
//     }
//   ]
// };

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
      console.log(action);
      return {
        ...state,
        contacts: [...action.payload]
      };
    default:
      return state;
  }
}
