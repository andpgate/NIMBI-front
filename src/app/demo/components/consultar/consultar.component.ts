import { Component, OnInit, ViewChild} from '@angular/core';
import { VentaService, Venta } from './venta.service';
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
      },
      (error) => {
        this.errorMessage = 'Venta no encontrada';
      }
    );
  }

  // Método para buscar ventas por rango de fechas
  buscarVentasPorFecha(desde: string, hasta: string) {
    this.ventaService.getVentasPorFecha(desde, hasta).subscribe(
      (data) => {
        this.ventas = data;
      },
      (error) => {
        this.errorMessage = 'Error al consultar ventas';
      }
    );
  }
}
