import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import * as fromContacts from '../store/contacts.reducer';
import * as ContactsActions from '../store/contacts.action';
import { Contact } from '../contact.model';
import { INationality, NationalityService } from './nationality.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactEditForm: FormGroup;
  id: number;
  editMode = false;
  nationalities: INationality[];
  filterednationalities: INationality[];
  mapBaseUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCLuBpYlUbul4swJ4ayjuf1WNcweZC-0xw&q=';
  mapUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromContacts.IContactState>,
    private nationalityService: NationalityService
  ) { }

  ngOnInit() {
    this.nationalityService.getNationalities().subscribe(res => {
      // console.log(res);
      this.nationalities = res;
      this.filterednationalities = res;
      console.log('nationalities received', this.nationalities);
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log('Contact ID received', this.id);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  searchNationality(event) {
    // console.log(event.query);
    this.filterednationalities = this.nationalities.filter((el: INationality) =>
      el.countryName.toLowerCase().includes(event.query.toLowerCase())
    );
    // console.log('Filtered nationalities', this.filterednationalities);
  }

  onSubmit() {
    if (this.contactEditForm.value['photo'] === '') {
      this.contactEditForm.value['photo'] =
        'https://www.velvetjobs.com/assets/noavatar-profile.jpg';
    }
    console.log(this.contactEditForm.value);
    if (this.editMode) {
      this.store.dispatch(
        new ContactsActions.UpdateContact({
          index: this.id,
          updateContact: this.contactEditForm.value
        })
      );
    } else {
      this.store.dispatch(
        new ContactsActions.AddContact(this.contactEditForm.value)
      );
    }
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
    let dob = null;
    const location = {
      street: '',
      city: '',
      state: '',
      postcode: ''
    };
    let gender = 'male';
    let nat = {};
    if (this.editMode) {
      this.store
        .select('contacts')
        .take(1)
        .subscribe((contacts: Contact[]) => {
          const foundContact = contacts['contacts'][this.id];
          title = foundContact.title;
          firstname = foundContact.firstname;
          lastname = foundContact.lastname;
          phone = foundContact.phone;
          cell = foundContact.cell;
          email = foundContact.email;
          photo = foundContact.photo;
          dob = new Date(foundContact.dob);
          location.street = foundContact.location.street;
          location.city = foundContact.location.city;
          location.state = foundContact.location.state;
          location.postcode = foundContact.location.postcode;
          gender = foundContact.gender;
          nat = foundContact.nat;
        });
    }
    this.contactEditForm = new FormGroup({
      title: new FormControl(title, [Validators.maxLength(5)]),
      firstname: new FormControl(firstname, Validators.required),
      lastname: new FormControl(lastname, Validators.required),
      phone: new FormControl(phone, [
        Validators.required,
        Validators.pattern(/\b\d{2}[-.]?\d{4}[-.]?\d{3}\b/)
      ]),
      cell: new FormControl(cell, [
        Validators.required,
        Validators.pattern(/\b\d{2}[-.]?\d{4}[-.]?\d{3}\b/)
      ]),
      email: new FormControl(email, Validators.email),
      photo: new FormControl(
        photo,
        Validators.pattern(
          /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/
        )
      ),
      dob: new FormControl(dob),
      location: new FormGroup({
        street: new FormControl(location.street),
        city: new FormControl(location.city),
        state: new FormControl(location.state),
        postcode: new FormControl(location.postcode)
      }),
      gender: new FormControl(gender),
      nat: new FormControl(nat)
    });
    this.mapUrl = `${this.mapBaseUrl}
    ${this.contactEditForm.value.location.street}
    +${this.contactEditForm.value.location.postcode}
    +${this.contactEditForm.value.location.city}
    +${this.contactEditForm.value.location.state}`;
  }
}
