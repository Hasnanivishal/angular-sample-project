import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
