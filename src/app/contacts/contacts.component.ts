import { Component, OnInit } from '@angular/core';
import {ContactsService} from './contacts.service';
import {Contact} from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactsList: Contact[];
  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsList = this.contactsService.getAll();
  }

}
