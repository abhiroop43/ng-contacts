import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import {Contact} from './contact.model';
import * as fromContacts from './store/contacts.reducer';
import * as ContactActions from './store/contacts.action';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {ContactsEffects} from './store/contacts.effects';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactsList: Observable<Contact[]>;
  msgs: Message[] = [];
  constructor(private store: Store<fromContacts.IContactState>,
              private router: Router,
              private contactsEffects: ContactsEffects) { }

  ngOnInit() {
    this.contactsList = this.store.select('contacts');

    this.contactsEffects.contactsStore
      .filter(action => action.type === ContactActions.STORE_CONTACTS_SUCCESS)
      .subscribe(() => {
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: 'Contacts Saved',
          detail: 'Contacts saved successfully'
        });
      });
    this.contactsEffects.contactsStore
      .filter(action => action.type === ContactActions.STORE_CONTACTS_ERROR)
      .subscribe(() => {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: 'Error Occurred',
          detail: 'Failed to save contacts'
        });
      });
  }

  onAdd() {
    this.router.navigate(['/contacts/new']);
  }

  storeData() {
    this.store.dispatch(new ContactActions.StoreContacts());
  }

  getData() {
    this.store.dispatch(new ContactActions.FetchContacts());
  }

}
