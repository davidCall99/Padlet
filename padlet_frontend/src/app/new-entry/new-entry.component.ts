import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PadletService} from "../services/padlet.service";
import {Entry} from "../interfaces/entry";
import {User} from "../interfaces/user";
import {EntryComment} from "../interfaces/entryComment";


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private padletService: PadletService,
    public dialogRef: MatDialogRef<NewEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { padletId: string, user: User }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      const formValue = this.form.value as EntryComment;
      formValue.creator = this.data.user.name;
      formValue.user_id = this.data.user.id;
      this.padletService.createEntry(this.data.padletId, formValue).subscribe(
        (entry) => {
          this.dialogRef.close(entry);
        },
        (error) => {
          console.log('Error creating entry:', error);
        }
      );
    }
  }
}

