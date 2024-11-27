import { Component, OnInit, ViewChild} from '@angular/core';
import { VentaService, Venta, DetalleCantidadProductoVentaDTO } from './venta.service';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']  // Aquí cambias la extensión
})
export class ConsultarComponent implements OnInit{
  title = 'LISTADO DE VENTAS';
  totalResultados: number = 0;
  totalIngresos: number = 0;
  venta: Venta | null = null;
  ventas: Venta[] = [];

  errorMessage: string = '';

  constructor(private  ventaService: VentaService) { }
 
  ngOnInit(): void {
  }

  
  // Método para buscar venta por ID
  buscarVentaPorId(idVenta: number) {
    this.ventaService.getVentaById(idVenta).subscribe(
      (data) => {
        this.venta = data;
        this.totalResultados = 1;  // Solo una venta encontrada
        this.totalIngresos = data.total;  // Ingreso total de esa venta
      },
      (error) => {
        this.errorMessage = 'Venta no encontrada';
      }
    );
  }
  
  // Método para buscar ventas por rango de fechas
  buscarVentasPorFecha(desde: string, hasta: string) {
    this.ventaService.getVentasPorFecha(desde, hasta).subscribe(
      (data: Venta[]) => {
        this.ventas = data;
        this.totalResultados = this.ventas.length;  // Calculamos el número de resultados
        this.totalIngresos = data.reduce((total, venta) => total + (venta.total || 0), 0);  // Suma de los ingresos

      },
      
      (error) => {
        this.errorMessage = 'Error al consultar ventas';
      }
    );
  }

  // Método para buscar por nombre del cliente
  buscarVentasPorNombre(nombreCliente: string) {
    this.ventaService.buscarVentasPorNombreCliente(nombreCliente).subscribe(
      (data: Venta[]) => {
        this.ventas = data; // Guardar las ventas encontradas
        this.totalResultados = this.ventas.length;  // Calculamos el número de resultados
        this.totalIngresos = data.reduce((total, venta) => total + (venta.total || 0), 0);  // Suma de los ingresos

    },
      (error) => {
        this.errorMessage = 'Error al consultar ventas';
      }
    );
  }
  

}

