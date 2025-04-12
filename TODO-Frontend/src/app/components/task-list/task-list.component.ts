import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input,OnChanges,Output, SimpleChanges } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [MatCheckboxModule,CommonModule],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges {
    @Input('selectedTasks') selectedTasks: any[] = [];
    @Input('viewMode') viewMode: any;
    @Output() modifyTask = new EventEmitter<any>();

    constructor() {
        console.log('TaskListComponent initialized');
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log('TaskListComponent changes:', changes);
    }
    
    modifyTaskHandler(task: any): void {
        this.modifyTask.emit(task);
    }
}
   