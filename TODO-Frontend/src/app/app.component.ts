import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TODO-Frontend';
}
