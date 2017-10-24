import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {Contact} from './contact.model';
import * as fromContacts from './store/contacts.reducer';
import * as ContactsActions from './store/contacts.action';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  // contactsList: Observable<{contacts: Contact[]}>;
  contactsList: Observable<Contact[]>;

  displayedColumns = ['name'];
  constructor(private store: Store<fromContacts.IContactState>) { }

  ngOnInit() {
    this.contactsList = this.store.select('contacts');
  }

}
