import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './layoutComponents/main/app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
//Custom modules
import { AuthModule } from './modules/auth/auth.module'
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { OverviewComponent } from './modules/dashboard/components/overview/overview.component';


@NgModule({
    imports: [
        AuthModule,
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent, canActivate: [AuthGuard],
                children: [
                    { path: '', component: OverviewComponent }
                ]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
