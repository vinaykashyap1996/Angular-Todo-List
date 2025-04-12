import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-list-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogActions, MatButton, MatDialogContent, MatDialogTitle],
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent {
  listTitle = ''; // Model for the input field

  constructor(private dialogRef: MatDialogRef<AddListDialogComponent>) {}

  onSubmit(): void {
    if (this.listTitle.trim()) {
      this.dialogRef.close({ title: this.listTitle, count: 0 }); // Pass data back to the parent
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without passing data
  }
}
