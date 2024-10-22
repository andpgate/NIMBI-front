import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AccordionModule } from 'primeng/accordion';
import { CrearInformeComponent } from './crear-informe/crear-informe.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, CrearInformeComponent],
    imports: [AppRoutingModule, AppLayoutModule,AccordionModule, FormsModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
