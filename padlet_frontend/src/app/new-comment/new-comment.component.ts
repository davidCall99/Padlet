import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../services/padlet.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntryComment} from "../interfaces/entryComment";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private padletService: PadletService,
    public dialogRef: MatDialogRef<NewCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entryId: string, user: User }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
    console.log(this.data.entryId);
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      const formValue = this.form.value as EntryComment;
      formValue.creator = this.data.user.name;
      formValue.user_id = this.data.user.id;
      this.padletService.addComment(this.data.entryId, formValue).subscribe(
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

