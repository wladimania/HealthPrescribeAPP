import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.page.html',
  styleUrls: ['./agregar-medicamento.page.scss'],
})
export class AgregarMedicamentoPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

}
