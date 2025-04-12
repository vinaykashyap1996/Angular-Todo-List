import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AddListDialogComponent } from '../add-list-dialog/add-list-dialog.component'; // Import the dialog component

interface ITodoList {
  list: {
    title:string
  };
  taskCount?: number;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule for *ngFor and other directives
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})


export class SideNavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallScreen = false;
  private apiService = inject(ApiService);
  private breakpointSubscription!: Subscription;
  lists:ITodoList[] = [];
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {}
  selectedTasks: any[] = [];
  viewMode: 'list' | 'grid' = 'list'; // Default view mode
  
  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.updateSidenavMode();
      });

      this.apiService.getLists().subscribe({
        next: (data) => {
          // Assuming the API returns an array of lists
          // You can modify this part based on the actual structure of your API response
          // For example, if the API returns an object with a 'lists' property:
          this.lists = data;
          this.apiService.list.set(data);

          if(this.lists.length > 0) {
            this.onSelectList(this.lists[0]); // Select the first list by default
          }
        },
        error: (error) => {
          console.error('Error fetching lists:', error);
        }
      });
      
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

    dialogRef.afterClosed().subscribe((result: ITodoList | undefined) => {
      if (result) {
      // Call the API service to add the new list
      this.apiService.createList(result).subscribe({
        next: (response: ITodoList) => {
        console.log('List added successfully:', response);
        this.lists.push(response); // Update the lists array
        },
        error: (error: unknown) => {
        console.error('Error adding list:', error);
        }
      });
      }
    });
  }

  onSelectList(list: any): void {
    // Fetch tasks for the selected list
    this.apiService.getTasksByListId(list.list._id).subscribe({
      next: (tasks: any) => {
        this.selectedTasks = tasks?.tasks || [];
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  toggleView(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }

  private updateSidenavMode(): void {
    if (this.isSmallScreen) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }
}