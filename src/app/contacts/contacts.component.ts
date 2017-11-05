import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import {Contact} from './contact.model';
import * as fromContacts from './store/contacts.reducer';
import * as ContactActions from './store/contacts.action';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {ContactsEffects} from './store/contacts.effects';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contactsState: Observable<Contact[]>;
  msgs: Message[] = [];
  contactSearchForm: FormGroup;
  contactsStoreSuccessSub: Subscription;
  contactsStoreErrorSub: Subscription;

  constructor(private store: Store<fromContacts.IContactState>,
              private router: Router,
              private contactsEffects: ContactsEffects) { }

  ngOnInit() {
    this.contactsState = this.store.select('contacts');

    this.contactsStoreSuccessSub = this.contactsEffects.contactsStore
      .filter(action => action.type === ContactActions.STORE_CONTACTS_SUCCESS)
      .subscribe(() => {
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: 'Contacts Saved',
          detail: 'Contacts saved successfully'
        });
      });
    this.contactsStoreErrorSub = this.contactsEffects.contactsStore
      .filter(action => action.type === ContactActions.STORE_CONTACTS_ERROR)
      .subscribe(() => {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: 'Error Occurred',
          detail: 'Failed to save contacts'
        });
      });
    this.initSearchForm();
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

  initSearchForm() {
    this.contactSearchForm = new FormGroup({
      searchVal: new FormControl('', Validators.required)
    });
  }

  onSearch() {
    const searchVal = this.contactSearchForm.value['searchVal'];

    if (searchVal) {
      console.log('Searching for....', searchVal);
      this.store.dispatch(new ContactActions.SearchContacts(searchVal));
    }
  }

  clearSearch() {
    this.contactSearchForm.reset();
    this.store.dispatch(new ContactActions.ClearSearchContacts());
  }

  ngOnDestroy() {
    this.contactsStoreSuccessSub.unsubscribe();
    this.contactsStoreErrorSub.unsubscribe();
  }

}
