import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home.component';
import { WorkListComponent } from './work-list/work-list.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkListComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
