import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddListDialogComponent } from '../add-list-dialog/add-list-dialog.component';
import * as ListActions from '../../store/list-task.actions';
import * as ListSelectors from '../../store/list-task.selectors';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Observable } from 'rxjs';
import {List, Task, ListState} from '../../model/list-task.model';

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
    MatLabel,
    MatButton,
    MatInput,
    MatFormField
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  private store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog);

  isSmallScreen = false;
  private breakpointSubscription!: Subscription;

  lists$: Observable<List[]> = this.store.select(ListSelectors.selectAllLists);
  selectedTasks: Task[] = [];
  selectedList: List | null = null;

  newTaskTitle = '';
  newTaskDescription = '';
  viewMode: 'list' | 'grid' = 'list';

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        if (this.sidenav) {
          this.updateSidenavMode();
        }
      });

    this.store.dispatch(ListActions.loadLists());
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

  onAddList(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: { title: string } | undefined) => {
      if (result) {
        this.store.dispatch(ListActions.createList({ list: { title: result.title, tasks: [] } }));
      }
    });
  }

  onSelectList(list: List): void {
    this.selectedList = list;
    this.selectedTasks = [];

    this.store.dispatch(ListActions.loadLists());
    this.store.select(ListSelectors.selectAllLists).subscribe(lists => {
      const match = lists.find(l => l.id === list.id);
      this.selectedTasks = match?.tasks || [];
    });
  }

  onCreateTask(): void {
    if (!this.selectedList) return;

    this.store.dispatch(ListActions.createTask({
      listId: this.selectedList.id,
      task: {
        title: this.newTaskTitle,
        description: this.newTaskDescription
      }
    }));

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
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }
}
