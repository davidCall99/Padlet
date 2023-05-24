// invite.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {
  inviteForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InviteComponent>) {}

  onSubmit(): void {
    if (this.inviteForm.valid) {
      this.dialogRef.close(this.inviteForm.value.email);
    }
  }
}
