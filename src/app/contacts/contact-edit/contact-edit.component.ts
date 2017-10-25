import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactEditForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log(this.contactEditForm.value);
  }

  private initForm() {
    const title = '';
    const firstname = '';
    const lastname = '';
    const phone = '';
    const cell = '';
    const email = '';
    const photo = '';
    this.contactEditForm = new FormGroup(
      {
        'title': new FormControl(title),
        'firstname': new FormControl(firstname, Validators.required),
        'lastname': new FormControl(lastname, Validators.required),
        'phone': new FormControl(phone,
          [Validators.required,
            Validators.pattern(/\b\d{2}[-.]?\d{4}[-.]?\d{3}\b/)]),
        'cell': new FormControl(cell,
          [Validators.required,
            Validators.pattern(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)]),
        'email': new FormControl(email, Validators.email),
        'photo': new FormControl(photo,
          Validators
            .pattern(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/))
      }
    );
  }

}
