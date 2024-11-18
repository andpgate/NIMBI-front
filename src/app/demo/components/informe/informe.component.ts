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

  organizaciones: string[] = [];
  organizacion: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  informeGenerado: boolean = false;
  datosInforme: Informe[] = [];

  generarInforme() {
    if (this.organizacion && this.fechaInicial && this.fechaFinal) {
      console.log('Generando informe para:', this.organizacion, this.fechaInicial, this.fechaFinal);

      this.informeGenerado = true; 
    } else {
      console.error('Por favor complete todos los campos.');
    }
  }
}