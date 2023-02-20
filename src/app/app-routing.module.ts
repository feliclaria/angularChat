import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

function redirectLoggedInToHome() {
  return redirectLoggedInTo(['/home']);
}

function redirectUnauthorizedToLogIn() {
  return redirectUnauthorizedTo(['/login']);
}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () =>
      import('src/app/features/sign-up/sign-up.module').then((m) => m.SignUpModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/features/log-in/log-in.module').then((m) => m.LogInModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/features/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogIn)
  },
  {
    path: 'verify',
    loadChildren: () => import('src/app/features/verify/verify.module').then((m) => m.VerifyModule),
    ...canActivate(redirectUnauthorizedToLogIn)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
