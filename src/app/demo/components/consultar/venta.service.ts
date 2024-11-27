import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Venta {
  idVenta: number;
  idCliente: number;
  nombreCliente: string;
  fecha: string;
  total: number;
  detalleCantidadProductoVentaDTOList: DetalleCantidadProductoVentaDTO[]; // Añade esta propiedad
}

export interface DetalleCantidadProductoVentaDTO {
  idDetalleProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:8080/api/ventas'; // Cambia esto según tu URL base del backend

  constructor(private http: HttpClient) { }

  // Método para consultar venta por ID
  getVentaById(idVenta: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${idVenta}`);
  }

  // Método para consultar ventas por rango de fechas
  getVentasPorFecha(desde: string, hasta: string): Observable<Venta[]> {
    const url = `${this.apiUrl}/consultarPorFecha`; // URL completa
    let params = new HttpParams().set('fechaDesde', desde).set('fechaHasta', hasta);
    return this.http.get<Venta[]>(url, { params });
  }

  // Método para consultar ventas por cliente
  buscarVentasPorNombreCliente(nombreCliente: string): Observable<Venta[]> {
    const params = new HttpParams().set('nombreCliente', nombreCliente);
    return this.http.get<Venta[]>(`${this.apiUrl}/cliente`, { params });
  }


  
}
