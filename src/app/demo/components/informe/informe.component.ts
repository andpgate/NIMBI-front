import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Informe {
  fecha: string;
  productosVendidos: number;
  totalVenta: number;
  utilidad: number;
}

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent {

  organizaciones: string[] = ['Cliente A', 'Cliente B', 'Cliente C'];
  organizacion: string = '';
  fechaInicial: string = '2024-09-01';
  fechaFinal: string = '2024-09-30';
  informeGenerado: boolean = false;
  datosInforme: Informe[] = [];

  generarInforme() {
    if (this.organizacion && this.fechaInicial && this.fechaFinal) {
      console.log('Generando informe para:', this.organizacion, this.fechaInicial, this.fechaFinal);

      // Simular datos del informe
      this.datosInforme = [
        {
          fecha: '2024-09-05',
          productosVendidos: 150,
          totalVenta: 12000,
          utilidad: 20,
        },
        {
          fecha: '2024-09-15',
          productosVendidos: 200,
          totalVenta: 15000,
          utilidad: 18,
        },
        {
          fecha: '2024-09-25',
          productosVendidos: 180,
          totalVenta: 14000,
          utilidad: 22,
        }
      ];

      this.informeGenerado = true; 
    } else {
      console.error('Por favor complete todos los campos.');
    }
  }
}