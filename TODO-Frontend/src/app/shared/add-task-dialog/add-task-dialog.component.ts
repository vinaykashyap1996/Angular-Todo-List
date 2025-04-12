import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton,MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent {
    taskTitle = ''; // Model for the input field
    taskDescription = ''; // Model for the input field
    
    constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>) {}
    
    onSubmit(): void {
        if (this.taskTitle.trim()) {
        this.dialogRef.close({ title: this.taskTitle, description: this.taskDescription }); // Pass data back to the parent
        }
    }
    
    onCancel(): void {
        this.dialogRef.close(); // Close the dialog without passing data
    }
}