import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
})
export class CRMComponent {
  userForm!: FormGroup;
  isSubmitForm = false;
  options = [
    'Schools',
    'Tuition Fees',
    'Registration Form',
    'Collaboration',
    'Location',
    'HR Email & Vacancies',
    'Post Graduate Programs',
    'Certificate',
    'Admissions',
    'Suppliers',
    'Others'
  ];
  constructor(public fb: FormBuilder) {
    this.initForm();
  }
  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/[0-9]{11}/)]],
      whatsAppNumber: [''],
      typeOfCall: ['', Validators.required],
      callStatus: ['', Validators.required],
      followUp: ['', Validators.required],
      callerType: ['', Validators.required],
      city: [''],
      school: [''],
      percentage: [''],
      certificateType: [''],
      askedQuestions: [[], Validators.required],
      answer: ['', Validators.required],
      notes: [''],
    });
  }


  onSubmit() {
    this.isSubmitForm = true;
    if (this.userForm.valid) {
      //form validated success
      this.showMessage('Form submitted successfully.');
    }
  }
  showMessage(msg = '', type = 'success') {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: 'toast' },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });
  }

}
