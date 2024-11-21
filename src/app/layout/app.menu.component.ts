import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Venta de celulares',
                items: [
                    { label: 'Registrar venta', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/registrar'] },
                    { label: 'Consultar venta', icon: 'pi pi-fw pi-search', routerLink: ['/consultar'] },
                    { label: 'Crear informe de ventas', icon: 'pi pi-fw pi-file', routerLink: ['/informe'] }
                ],
                image: `<img src="/assets/demo/images/galleria/logo.png" alt="Logo" width="230" height="230">`            
        }
        ];
    }
}
