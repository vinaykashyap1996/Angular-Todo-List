import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddListDialogComponent } from '../add-list-dialog/add-list-dialog.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {List, Task } from '../../model/list-task.model';
import { ApiService } from '../../services/api.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatIconButton,
    FormsModule,
    MatCheckboxModule,
    TaskListComponent,
    SpinnerComponent
],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  private apiService = inject(ApiService);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog);

  isSmallScreen = false;
  private breakpointSubscription!: Subscription;

  lists: List[] = [];
  selectedTasks: Task[] = [];
  selectedList: List | null = null;
  isLoading = false;
  newTaskTitle = '';
  newTaskDescription = '';
  viewMode: 'list' | 'grid' = 'list';

  ngOnInit(): void {
    this.getAllLists();
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        if (this.sidenav) {
          this.updateSidenavMode();
        }
      });

  }

  ngAfterViewInit(): void {
    if (this.sidenav) {
      this.updateSidenavMode();
    }
  }

  ngOnDestroy(): void {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  getAllLists(): void {
    this.apiService.getLists().subscribe((response) => {
      console.log('Fetched lists:', response);
      this.lists = response.data.lists;
      this.onSelectList(this.lists[0]);
    },
    (error) => {
      console.error('Error fetching lists:', error);
    });
  }

  onAddList(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: { title: string } | undefined) => {
      if (result) {
        this.apiService.createList({title: result.title, tasks: [] }).subscribe((response) => {

        },
        (error) => {
          console.error('Error creating list:', error);
        });
      }
    });
  }

  onSelectList(list: List): void {
    this.selectedList = list;
    this.selectedTasks = [];
    this.isLoading = true;
    this.apiService.getTasksByListId(list._id).subscribe((response) => {
      console.log('Fetched tasks:', response);
      if('data' in response) {
        const data = response.data as { tasks: Task[] };
        this.selectedTasks = data.tasks;
        this.isLoading = false;
      }
    },
    (error) => { 
      console.error('Error fetching tasks:', error);
    })
  }

  onCreateTask(): void {
    if (!this.selectedList) return;

    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }

  toggleView(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }

  private updateSidenavMode(): void {
    if (!this.sidenav) return;

    if (this.isSmallScreen) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
      this.viewMode = 'list' 
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }

  modifyTask(task: any): void {

    this.apiService.modifyTask(this.selectedList!._id, task._id).subscribe((response) => {
      console.log('Task modified:', response);
      this.onSelectList(this.selectedList!);
    }
    , (error) => {
      console.error('Error modifying task:', error);
    })
  }

  addNewTask(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px'
    })
    dialogRef.afterClosed().subscribe((result: { title: string,description:string } | undefined) => {
      if (result) {
        this.apiService.createTask(this.selectedList!._id, {title: result.title, description: result.description}).subscribe((response) => {
          console.log('Task created:', response);
          this.onSelectList(this.selectedList!);
        },
        (error) => {
          console.error('Error creating task:', error);
        });
      }
    });
  }

}
