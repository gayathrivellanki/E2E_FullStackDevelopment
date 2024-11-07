import { Component } from '@angular/core';
import CreateUserRequest from '../types/CreateUserRequest';
import CreateUserFormErrors from '../types/CreateUserFormErrors';
import { UsersApiService } from '../service/user/users-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-member',
  standalone: true,
  imports: [],
  templateUrl: './create-member.component.html',
  styleUrl: './create-member.component.css'
})
export class CreateMemberComponent {
  title = 'Create User';
  submitting = false;
  errorMessage = '';
  userCreated = false;

  constructor(private titleService: Title, private usersApiService: UsersApiService) {
    this.titleService.setTitle(this.title);
  }

  userForm: CreateUserRequest = {
    firstName: '',
    lastName: '',
    accountId: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  userFormErrors: CreateUserFormErrors = {
    firstName: '',
    lastName: '',
    accountId: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  private validateForm(): boolean {
    let isValid = true;
    this.userFormErrors = {
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };

    if (this.userForm.firstName === '' ||  this.userForm.firstName.length < 2) {
      this.userFormErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (this.userForm.lastName === '' || this.userForm.lastName.length < 2) {
      this.userFormErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (this.userForm.accountId === '' || this.userForm.accountId.length < 9) {
      this.userFormErrors.accountId = 'Account ID is required';
      isValid = false;
    }

    if (this.userForm.line1 === '' || this.userForm.line1.length < 3) {
      this.userFormErrors.line1 = 'Address line 1 is required and must be at least 3 characters';
      isValid = false;
    }

    if (this.userForm.city === '' || this.userForm.city.length < 2) {
      this.userFormErrors.city = 'City is required';
      isValid = false;
    }

    if (this.userForm.state === '' || this.userForm.state.length < 2) {
      this.userFormErrors.state = 'State is required';
      isValid = false;
    }

    if (this.userForm.zip === '' || this.userForm.zip.length < 5) {
      this.userFormErrors.zip = 'Zip code is required';
      isValid = false;
    }

    if (this.userForm.country === '' || this.userForm.country.length < 2) {
      this.userFormErrors.country = 'Country is required';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    } 

    this.submitting = true;
    this.usersApiService.createUser(this.userForm)
      .subscribe(response => {
        this.submitting = false;
        console.log(response);
        if (response.error !== null) {
          if (response.error.has('raw')) {
            this.errorMessage = response.error.get('raw') || 'An unexpected error occurred';

            setTimeout(() => {
              this.errorMessage = '';
            }, 7000);
          }

          this.userFormErrors = {
            firstName: response.error.get('firstName') || '',
            lastName: response.error.get('lastName') || '',
            accountId: response.error.get('accountId') || '',
            line1: response.error.get('line1') || '',
            line2: response.error.get('line2') || '',
            city: response.error.get('city') || '',
            state: response.error.get('state') || '',
            zip: response.error.get('zip') || '',
            country: response.error.get('country') || '',
          };
        } else {
          this.userCreated = true;
          setTimeout(() => {
            this.userCreated = false;
          }, 7000);
          this.resetForm();
        }
      });
  }

  onInputChange(event: Event, key: string) {
    const value = (event.target as HTMLInputElement).value;
    switch (key) {
      case 'firstName':
        this.userForm.firstName = value;
        break;
      case 'lastName':
        this.userForm.lastName = value;
        break;
      case 'accountId':
        this.userForm.accountId = value;
        break;
      case 'line1':
        this.userForm.line1 = value;
        break;
      case 'line2':
        this.userForm.line2 = value;
        break;
      case 'city':
        this.userForm.city = value;
        break;
      case 'state':
        this.userForm.state = value;
        break;
      case 'zip':
        this.userForm.zip = value;
        break;
      case 'country':
        this.userForm.country = value;
        break;
    }
  }

  resetForm() {
    this.userForm = {
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
    this.userFormErrors = {
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
  }
}
