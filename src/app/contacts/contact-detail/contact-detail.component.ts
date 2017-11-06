import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/primeng';
import { Contact } from '../contact.model';
import * as fromContacts from '../store/contacts.reducer';
import * as ContactsActions from '../store/contacts.action';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  id: number;
  contactsState: Observable<Contact[]>;
  contact: Contact;

  constructor(private confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromContacts.IContactState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log('ID found', this.id);
        this.contactsState = this.store.select('contacts');
        this.bindData();
      }
    );
  }

  bindData() {
    this.store.select('contacts')
    .take(1)
    .subscribe(
      (contacts: Contact[]) => {
        this.contact = contacts['contacts'][this.id];
        console.log('Found contact', this.contact);
      }
    );
  }

  deleteContact() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this contact?',
      accept: () => {
        console.log('delete contact confirmed');
        this.store.dispatch(new ContactsActions.DeleteContact(this.id));
        this.router.navigate(['/contacts']);
      }
    });
  }

}
