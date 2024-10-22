import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  //obtener clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/clientes`);
  }

  //obtener productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/productos/detalle/suggestion/app`);
  }

  //registrar una venta
  registrarVenta(idCliente: number, detalles: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ventas/crear?idCliente=${idCliente}`, detalles);
  }
}
