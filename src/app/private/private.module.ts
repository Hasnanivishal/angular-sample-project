import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatDividerModule, MatListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { HomePageListingComponent } from './home-page-listing/home-page-listing.component';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, DashboardComponent, HomePageListingComponent],
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
  ]
})
export class PrivateModule { }
