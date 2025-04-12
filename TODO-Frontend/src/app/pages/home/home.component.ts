import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  lists: any[] = [];
  ngOnInit() {
    this.apiService.getLists().subscribe({
      next: (data) => {
        console.log('Fetched lists:', data);
        // Assuming the API returns an array of lists
        // You can modify this part based on the actual structure of your API response
        // For example, if the API returns an object with a 'lists' property:
        this.lists = data.data.lists;
        this.apiService.list.set(data);
      },
      error: (error) => {
        console.error('Error fetching lists:', error);
      }
    });
  }
}


