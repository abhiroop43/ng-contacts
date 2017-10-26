import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromContacts from './contacts/store/contacts.reducer';
import * as ContactActions from './contacts/store/contacts.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  collapsed = true;

  constructor(private store: Store<fromContacts.IContactState>) {}
  ngOnInit() {
    this.store.dispatch(new ContactActions.FetchContacts());
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
