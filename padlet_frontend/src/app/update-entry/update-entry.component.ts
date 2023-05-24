import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {PadletService} from "../services/padlet.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Entry} from "../interfaces/entry";

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss']
})
export class UpdateEntryComponent implements OnInit {
  entryForm = this.fb.group({
    content: [this.data.entry.content, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private padletService: PadletService,
    public dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry: Entry }
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      if (this.entryForm.value.content){
      const content: string = this.entryForm.value.content;
      this.padletService.updateEntry(this.data.entry.id, content).subscribe(updatedEntry => {
        this.dialogRef.close(updatedEntry);
      });
      }
    }
  }
}
