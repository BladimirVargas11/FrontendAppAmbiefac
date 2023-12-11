import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subtema, subtemas } from '../../../cursos/shared/models/subTemasModels';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalbodyComponent } from 'src/app/Shared/components/modalbody/modalbody.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubtemasService } from '../../shared/services/subtemas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTema } from '../../shared/models/subtemas';

@Component({
  selector: 'app-subtemas-curso',
  templateUrl: './subtemas-curso.component.html',
  styleUrls: ['./subtemas-curso.component.scss']
})
export class SubtemasCursoComponent {
  rutaId: number  = 0;
  titulo: string = "";
  currentPage = 1;
  pageSize = 5;
  listSubtemas = subtemas
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  private _name: string | null = null;
  miFormulario!: FormGroup;

  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
    this.titulo = `Subtemas: ${value}`;
  }

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private service: SubtemasService
    ) { }

  ngOnInit(): void {
    this.getParams();
    this.formBuilders();
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
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id')?? '0');
      this.name = params.get('name');
      this.getData();
      this.hiden();
    });
  }
  private getData() {
    let contenido = this.service.getById(this.rutaId).Subtemas;
    this.listSubtemas = (contenido) ? contenido : [];
  }

  hiden(){
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  private formBuilders() {
    this.miFormulario = this.formBuilder.group({
      id:[],// quitar cuando integren con api
      nombreSubtema: ['', Validators.required],
      tema: [],
      contenido: []
    });
  }

  handleCurrentPageChange(newPage: number) {
    console.log(newPage);
    this.currentPage = newPage;
  }
  addTemas = ()=>{
    this.miFormulario.get('id')?.setValue(this.listSubtemas.length+1);
    let subtema = SubTema.SubTemaDesdeObject(this.miFormulario.value) || null;
    this.service.add(this.rutaId, subtema);
    this.getData();
  }
  redirecToUpdateTema = (id:number) => this.router.navigate([`admin/informacion-tema/${id}/${this.rutaId}`])
}
