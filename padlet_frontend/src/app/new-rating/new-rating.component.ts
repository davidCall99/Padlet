import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {PadletService} from "../services/padlet.service";
import {Rating} from "../interfaces/rating";

@Component({
  selector: 'app-new-rating',
  templateUrl: './new-rating.component.html',
  styleUrls: ['./new-rating.component.scss']
})
export class NewRatingComponent implements OnInit {
  ratingForm = this.fb.group({
    rating: ['', Validators.required]
  });
  newRating: Rating = {
    id: 'default',
    entry_id: "default",
    rating: 0
  }

  constructor(
    private fb: FormBuilder,
    private padletService: PadletService,
    public dialogRef: MatDialogRef<NewRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      if (this.ratingForm.value.rating) {
        const rating: number = Number(this.ratingForm.value.rating);

        this.padletService.addRating(this.data.entryId, rating).subscribe(rating => {
          this.dialogRef.close(rating);
        });
      }
    }
  }
}
