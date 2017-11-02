import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/withLatestFrom';
import * as fromContacts from './contacts.reducer';
import * as ContactsActions from './contacts.action';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Contact} from '../contact.model';
import {Store} from '@ngrx/store';

@Injectable()
export class ContactsEffects {

  @Effect()
  contactsFetch = this.actions
    .ofType(ContactsActions.FETCH_CONTACTS)
    .switchMap(
      (action: ContactsActions.FetchContacts) => {
        return this.httpClient.get<Contact[]>(
          'https://ng-contacts-d6378.firebaseio.com/contacts.json',
          {
          observe: 'body',
          responseType: 'json'
        });
      }
    )
    .map(
      (contacts) => {
        console.log('Contacts received from firebase', contacts);
        if (contacts != null) {
          return {
            type: ContactsActions.SET_CONTACTS,
            payload: contacts
          };
        }
        return {
          type: ContactsActions.GET_CONTACTS
        };
      }
    );

  @Effect({dispatch: false})
  contactAdd = this.actions
    .ofType(ContactsActions.ADD_CONTACT)
    .do(
      () => {
        this.router.navigate(['/contacts']);
      }
    );

  @Effect()
  contactsStore = this.actions
    .ofType(ContactsActions.STORE_CONTACTS)
    .withLatestFrom(this.store.select('contacts'))
    .switchMap(
      ([action, state]) => {
        const req = new HttpRequest('PUT',
          'https://ng-contacts-d6378.firebaseio.com/contacts.json',
          state['contacts'], {reportProgress: true});
        return this.httpClient.request(req);
      }
    )
    .map(
      (res) => {
        if (res.type === 2 && res['status'] === 200) {
          console.log('Saved to FireBase', res);
          return {
            type: ContactsActions.STORE_CONTACTS_SUCCESS,
          };
        } else if (res.type === 2 && res['status'] !== 200) {
          return {
            type: ContactsActions.STORE_CONTACTS_ERROR,
          };
        }
        return {
          type: ContactsActions.GET_CONTACTS
        };
      }
    ).share();

    @Effect()
    contactsClearSearch = this.actions
    .ofType(ContactsActions.CLEAR_SEARCH_CONTACTS)
    .map(
      () => {
        return {
          type: ContactsActions.FETCH_CONTACTS
        };
      }
    );

  constructor(private actions: Actions,
              private router: Router,
              private httpClient: HttpClient,
              private store: Store<fromContacts.IContactState>) {}
}
