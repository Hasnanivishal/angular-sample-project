import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent, DynamicComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatDividerModule, MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { HomePageListingComponent } from './home-page-listing/home-page-listing.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, DashboardComponent, HomePageListingComponent,
    DynamicComponentDirective, DynamicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [DynamicComponent]
})
export class PrivateModule { }
