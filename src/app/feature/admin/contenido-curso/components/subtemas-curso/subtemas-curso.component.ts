import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subtema, subtemas } from '../../../cursos/shared/models/subTemasModels';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalbodyComponent } from 'src/app/Shared/components/modalbody/modalbody.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubtemasService } from '../../shared/services/subtemas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTema } from '../../shared/models/subtemas';
import { SubTopicModel } from '../../shared/models/subTopicModel';

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
  listSubtemas!:SubTopicModel[];
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
    this.service.getSubTopicById(this.rutaId).subscribe( (contenido:any) =>{
      this.listSubtemas = (contenido.data) ? contenido.data : []}
    );
    setTimeout(() => {
      console.clear();
      console.log(this.listSubtemas);
    }, 1000);
  }

  hiden(){
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  private formBuilders() {
    this.miFormulario = this.formBuilder.group({
      idTopic: this.rutaId,// quitar cuando integren con api
      name: ['', Validators.required],
    });
  }

  handleCurrentPageChange(newPage: number) {
    console.log(newPage);
    this.currentPage = newPage;
  }
  addTemas = ()=>{
    let subtema = this.miFormulario.value
    debugger
    this.service.postSubtopic(subtema).subscribe(_=> this.getData());
    
  }
  redirecToUpdateTema = (id:number) => this.router.navigate([`admin/informacion-tema/${id}`])
}
