import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPipe, canActivate } from '@angular/fire/auth-guard';
import { map, pipe } from 'rxjs';

const notLoggedIn: AuthPipe = pipe(
  map((user) => !user || (!!user.phoneNumber ? ['/home'] : ['/verify']))
);
const loggedInAndVerified: AuthPipe = pipe(
  map((user) => (!!user && !!user.phoneNumber) || (!user ? ['/login'] : ['/verify']))
);
const loggedInAndUnverified: AuthPipe = pipe(
  map((user) => (!!user && !user.phoneNumber) || (!user ? ['/login'] : ['/home']))
);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () =>
      import('src/app/features/sign-up/sign-up.module').then((m) => m.SignUpModule),
    ...canActivate(() => notLoggedIn)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/features/log-in/log-in.module').then((m) => m.LogInModule),
    ...canActivate(() => notLoggedIn)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/features/home/home.module').then((m) => m.HomeModule),
    ...canActivate(() => loggedInAndVerified)
  },
  {
    path: 'verify',
    loadChildren: () => import('src/app/features/verify/verify.module').then((m) => m.VerifyModule),
    ...canActivate(() => loggedInAndUnverified)
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then((m) => m.AccountModule),
    ...canActivate(() => loggedInAndVerified)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
