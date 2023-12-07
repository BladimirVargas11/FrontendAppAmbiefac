import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subtema, subtemas } from '../../../cursos/shared/models/subTemasModels';

@Component({
  selector: 'app-subtemas-curso',
  templateUrl: './subtemas-curso.component.html',
  styleUrls: ['./subtemas-curso.component.scss']
})
export class SubtemasCursoComponent {
  rutaId: string | null = null;
  titulo: string = "";
  currentPage = 1;
  pageSize = 5;
  listSubtemas = subtemas
  private _name: string | null = null;

  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
    this.titulo = `Subtemas: ${value}`;
  }

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getParams();
  }

  addSubTema = () => {

  }



  private getParams() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = params.get('id');
      this.name = params.get('name');
    });
  }
  handleCurrentPageChange(newPage: number) {
    console.log(newPage);
    this.currentPage = newPage;
  }

  redirecToUpdateTema = () => this.router.navigate([`admin/informacion-tema/${this.rutaId}`])
}
