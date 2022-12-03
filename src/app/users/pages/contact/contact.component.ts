import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  submitted: boolean = false;
  mensaje: string = 'Todos los datos son validos';
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mensaje: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
  enviar() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    alert(
      'EXITO!!\n\n' +
        JSON.stringify(this.contactForm.value, null, 4) +
        this.mensaje
    );
  }
}
