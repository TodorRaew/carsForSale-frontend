import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './shared/components/about/about.component';
import { MyAdvertisementsComponent } from './shared/components/myAdvretisements/myAdvretisements.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './Auth.guard';
import { UserComponent } from './shared/components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { 
    path: 'about', 
    component: AboutComponent,
    data: { 
      title: 'ЗА НАС' 
    }
  },
  { 
    path: 'myAdvertisements', 
    component: MyAdvertisementsComponent,
    canActivate: [AuthGuard],
    data: { 
      title: 'МОИТЕ ОБЯВИ' 
    }
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { 
      title: 'ВСИЧКИ ОБЯВИ' 
    }
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'logout',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { 
      title: 'ПРЕГЛЕД НА ПРОФИЛА' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
