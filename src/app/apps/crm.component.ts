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
  codeArr: any = [];
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
  toggleCode = (name: string) => {
    if (this.codeArr.includes(name)) {
      this.codeArr = this.codeArr.filter((d: string) => d != name);
    } else {
      this.codeArr.push(name);
    }
  };
  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)]),
      whatsAppNumber: new FormControl(''),
      typeOfCall: new FormControl('', Validators.required),
      callStatus: new FormControl('', Validators.required),
      followUp: new FormControl('', Validators.required),
      callerType: new FormControl('', Validators.required),
      city: new FormControl(''),
      school: new FormControl(''),
      percentage: new FormControl(''),
      certificateType: new FormControl(''),
      askedQuestions: new FormControl([], Validators.required),
      answer: new FormControl('', Validators.required),
      notes: new FormControl(''),
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
