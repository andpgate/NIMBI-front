import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent {

  organizaciones: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];
  organizacion: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';

  generarInforme() {
    if (this.organizacion && this.fechaInicial && this.fechaFinal) {
        console.log('Generando informe para:', this.organizacion, this.fechaInicial, this.fechaFinal);
    } else {
        console.error('Por favor complete todos los campos.');
    }
}
}
