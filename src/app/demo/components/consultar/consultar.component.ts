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
  ventasPaginadas: any[] = []; // Ventas para mostrar en la página actual
  pageSize: number = 10; // Tamaño de la página (20 resultados por página)
  currentPage: number = 1; // Página actual
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
        console.log('Datos recibidos:', data); // Verifica la estructura de los datos aquí
        this.ventas = data;
        this.totalResultados = data.length;  // Calculamos el número de resultados
        this.totalIngresos = data.reduce((total, venta) => total + (venta.total || 0), 0);  // Suma de los ingresos
        this.paginarResultados(); // Cargar los resultados de la primera página

      },
      
      (error) => {
        this.errorMessage = 'Error al consultar ventas';
      }
    );
  }

  paginarResultados() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ventasPaginadas = this.ventas.slice(startIndex, endIndex); // Obtener los resultados de la página actual
  }

  cambiarPagina(direccion: number) {
    this.currentPage += direccion; // Cambiar de página (siguiente/anterior)
    this.paginarResultados(); // Actualizar los resultados de la página
  }
}

