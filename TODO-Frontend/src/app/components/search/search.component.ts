import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  imports: [MatInputModule, FormsModule, MatButton],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input('selectedTasks') selectedTasks: any[] = [];
  @Output() searchResults = new EventEmitter<any>();
  searchTask: string = '';
  searchTaskHandler: () => void = () => { console.log('Search text:', this.searchTask);
    console.log(this.selectedTasks.filter(task => task.title.includes(this.searchTask)))
    this.selectedTasks = this.selectedTasks.filter(task => task.title.includes(this.searchTask));
    this.searchResults.emit(this.selectedTasks);
  }

}
