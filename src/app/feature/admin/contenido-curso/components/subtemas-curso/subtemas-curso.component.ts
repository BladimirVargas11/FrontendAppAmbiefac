import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subtema, subtemas } from '../../../cursos/shared/models/subTemasModels';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalbodyComponent } from 'src/app/Shared/components/modalbody/modalbody.component';

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
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  private _name: string | null = null;

  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
    this.titulo = `Subtemas: ${value}`;
  }

  constructor(private route: ActivatedRoute, private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getParams();
  }

  addSubTema = () => {
   this.openModal()
  }

  openModal() {
    const modalRef = this.modalService.open(ModalbodyComponent, { centered: true });
    modalRef.componentInstance.modalTitle = 'Agregar nuevo subtema';
   modalRef.componentInstance.content = this.modalContent;
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
  addTemas = ()=>{console.log('TEMAS AGREGADOS', this.listSubtemas)}
  redirecToUpdateTema = () => this.router.navigate([`admin/informacion-tema/${this.rutaId}`])
}
