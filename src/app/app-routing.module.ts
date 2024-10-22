import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { CrearInformeComponent } from './crear-informe/crear-informe.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/informe/informe.module').then(m => m.InformeModule) },
                    { path: 'profile', loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
                    { path: 'informe', loadChildren: () => import('./demo/components/informe/informe.module').then(m => m.InformeModule) },
                    { path: 'consultar', loadChildren: () => import('./demo/components/consultar/consultar.module').then(m => m.ConsultarModule) },
                    { path: 'registrar', loadChildren: () => import('./demo/components/registrar/registrar.module').then(m => m.RegistrarModule) },
                    { path: 'crear-informe', component: CrearInformeComponent }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}