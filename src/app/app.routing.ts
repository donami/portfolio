import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home.component';
import { WorkListComponent } from './work-list/work-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkListComponent },
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
