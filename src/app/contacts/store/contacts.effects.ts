import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import * as ContactsActions from './contacts.action';

@Injectable()
export class ContactsEffects {
  @Effect({dispatch: false})
  contactAdd = this.actions
    .ofType(ContactsActions.ADD_CONTACT)
    .do(
      () => {
        this.router.navigate(['/contacts']);
      }
    );
  constructor(private actions: Actions, private router: Router) {}
}
