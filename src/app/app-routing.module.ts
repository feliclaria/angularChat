import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthPipeGenerator, canActivate } from '@angular/fire/auth-guard';
import { map, of, switchMap } from 'rxjs';

const redirectToHomeOrVerify: AuthPipeGenerator = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
  switchMap((user) => {
    return of(user).pipe(
      map((user) => {
        if (user) {
          if (user.phoneNumber) {
            // User is authorized and verified
            return ['/home'];
          } else {
            // User is authorized but not verified
            return ['/verify'];
          }
        } else {
          // User is not authorized
          return true;
        }
      })
    );
  });

const redirectToLogInOrVerify: AuthPipeGenerator = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
  switchMap((user) => {
    return of(user).pipe(
      map((user) => {
        if (user) {
          if (user.phoneNumber) {
            // User is authorized and verified
            return true;
          } else {
            // User is authorized but not verified
            return ['/verify'];
          }
        } else {
          // User is not authorized
          return ['/login'];
        }
      })
    );
  });

const redirectToHomeOrLogIn: AuthPipeGenerator = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
  switchMap((user) => {
    return of(user).pipe(
      map((user) => {
        if (user) {
          if (user.phoneNumber) {
            // User is authorized and verified
            return ['/home'];
          } else {
            // User is authorized but not verified
            return true;
          }
        } else {
          // User is not authorized
          return ['/login'];
        }
      })
    );
  });

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () =>
      import('src/app/features/sign-up/sign-up.module').then((m) => m.SignUpModule),
    ...canActivate(redirectToHomeOrVerify)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/features/log-in/log-in.module').then((m) => m.LogInModule),
    ...canActivate(redirectToHomeOrVerify)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/features/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectToLogInOrVerify)
  },
  {
    path: 'verify',
    loadChildren: () => import('src/app/features/verify/verify.module').then((m) => m.VerifyModule),
    ...canActivate(redirectToHomeOrLogIn)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
