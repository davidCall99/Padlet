import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-padlet',
  templateUrl: './new-padlet.component.html',
  styleUrls: ['./new-padlet.component.scss']
})
export class NewPadletComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewPadletComponent>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      animal: ['', Validators.required],
      private: [false],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form && this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
