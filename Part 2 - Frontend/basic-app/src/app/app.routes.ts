import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { SearchMemberComponent } from './search-member/search-member.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'user/create',
    component: CreateMemberComponent,
    data: { title: 'Create user' }
  },
  {
    path: 'user/search',
    component: SearchMemberComponent,
    data: { title: 'Search user' }
  }
];
