import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import * as fromContacts from '../store/contacts.reducer';
import * as ContactsActions from '../store/contacts.action';
import {Contact} from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactEditForm: FormGroup;
  id: number;
  editMode = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromContacts.IContactState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.contactEditForm.value);
    this.store.dispatch(new ContactsActions.AddContact(this.contactEditForm.value));
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  private initForm() {
    let title = '';
    let firstname = '';
    let lastname = '';
    let phone = '';
    let cell = '';
    let email = '';
    let photo = '';
    if (this.editMode) {
      this.store.select('contacts')
        .take(1)
        .subscribe(
          (contacts: Contact[]) => {
            const foundContact = contacts[this.id];
            title = foundContact.title;
            firstname = foundContact.firstname;
            lastname = foundContact.lastname;
            phone = foundContact.phone;
            cell = foundContact.cell;
            email = foundContact.email;
            photo = foundContact.photo;
          }
        );
    }
    this.contactEditForm = new FormGroup(
      {
        'title': new FormControl(title, [Validators.maxLength(5)]),
        'firstname': new FormControl(firstname, Validators.required),
        'lastname': new FormControl(lastname, Validators.required),
        'phone': new FormControl(phone,
          [Validators.required,
            Validators.pattern(/\b\d{2}[-.]?\d{4}[-.]?\d{3}\b/)]),
        'cell': new FormControl(cell,
          [Validators.required,
            Validators.pattern(/\b\d{2}[-.]?\d{4}[-.]?\d{3}\b/)]),
        'email': new FormControl(email, Validators.email),
        'photo': new FormControl(photo,
          Validators
            .pattern(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/))
      }
    );
  }

}
