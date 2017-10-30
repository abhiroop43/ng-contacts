import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {Contact} from './contact.model';
import * as fromContacts from './store/contacts.reducer';
import * as ContactActions from './store/contacts.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactsList: Observable<Contact[]>;
  constructor(private store: Store<fromContacts.IContactState>, private router: Router) { }

  ngOnInit() {
    this.contactsList = this.store.select('contacts');
    // this.store.dispatch(new ContactActions.FetchContacts());
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
