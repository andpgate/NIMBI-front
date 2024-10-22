import { Component,OnInit} from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { FormsModule} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import {MessageService } from 'primeng/api';
import { VentaService } from '../service/venta.service';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CardModule,DropdownModule,FormsModule,CalendarModule,InputTextModule,CommonModule,ToastModule,DialogModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [MessageService]
})
export class RegistrarComponent {

  //clientes
  selectedClient: any = null;
  clients: any[] = [];
  //fecha de registro
  date: Date | undefined;
  //cantidad items
  value: number;
  //value es entero
  entero: boolean = true;
  //dialog
  showDialog: boolean =false;
  selectedProducto: any = null;
  productos: any[] = [];

  ngOnInit() {
    // Cargar clientes y productos al iniciar el componente
    this.loadClients();
    this.loadProductos();
  }


  constructor(private service: MessageService, private ventaService: VentaService) { }

  //verificar si es entero
  verificarEntero() {
    this.entero = Number.isInteger(this.value);
  }
  
  //mostrar mensaje error si datos incompletos
  showErrorInc() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Complete todas las casillas' });
  }

  //mostrar mensaje error si cantidad no es un entero
  showErrorEnt() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Cantidad de items debe ser un número entero' });
  }

  //mostrar mensaje error si la cantidad es mayor que la disponible
  showErrorCa() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Ingresar una cantidad válida'});
  }

  //mostrar mensaje error si la cantidad es igual a 0
  showErrorCe() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'La cantidad no puede ser igual a 0'});
  }

  //mostrar mensaje si el registro fue exitoso
  showSuccess() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Éxito', detail: 'Se registró la venta correctamente' });
  }

  //validar datos ingresados
  validarCampos() {
    if (!this.value || !this.selectedClient || !this.date) {
      this.showErrorInc()
    }else if (!this.entero){
      this.showErrorEnt()
    }else if (this.selectedProducto && this.value > this.selectedProducto.cantidad) { //verificar que la cantidad deseada sea menor o igual a la disponible
      this.showErrorCa()
    }else if (this.value ==0 ) {
      this.showErrorCe()
    }
    else{
      this.showDialog = true;
    }
  }

  loadClients() {
    this.ventaService.getClientes().subscribe((data) => {
      this.clients = data.map(client => ({ nombre: client.nombre, id: client.id }));
    });
  }

  loadProductos() {
    this.ventaService.getProductos().subscribe((data) => {
        this.productos = data.map(product => ({ 
            nombre: product.nombre, 
            id: product.idDetalleProducto,
            cantidad: product.cantidad
        }));
    });
}

  registrarVenta() {
    const detalles = [{ idDetalleProducto: this.selectedProducto.id, cantidad: this.value }];

    this.ventaService.registrarVenta(this.selectedClient.id, detalles).subscribe(() => {
      this.showSuccess();
      this.showDialog = false;
    },
    (error) => {
        console.error('Error al registrar la venta:', error);
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Error al registrar la venta.' });
    }
);
}

}
