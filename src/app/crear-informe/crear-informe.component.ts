import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-informe',
  templateUrl: './crear-informe.component.html',
  styleUrls: ['./crear-informe.component.css']
})
export class CrearInformeComponent implements OnInit {

  organizaciones = ['Empresa A', 'Empresa B'];  // Esto puede venir de un servicio.
  organizacionSeleccionada = '';
  fechaInicial = '';
  fechaFinal = '';
  informeGenerado = false;
  ventas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    const filtros = {
      organizacion: this.organizacionSeleccionada,
      fechaInicial: this.fechaInicial,
      fechaFinal: this.fechaFinal
    };

    this.http.post('http://localhost:3000/informes', filtros)
      .subscribe((data: any) => {
        this.ventas = data.ventas;
        this.informeGenerado = true;
      }, (error) => {
        console.error('Error al generar el informe', error);
      });
  }
}
