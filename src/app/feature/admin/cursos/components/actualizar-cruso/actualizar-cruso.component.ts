import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../shared/services/curso.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-actualizar-cruso',
  templateUrl: './actualizar-cruso.component.html',
  styleUrls: ['./actualizar-cruso.component.scss']
})
export class ActualizarCrusoComponent {
  titulo: string = 'Agregar temática';
  rutaId: number = 0;
  hide:boolean = true;
  showImagePreview: boolean = false;
  miFormulario!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private spinner: NgxSpinnerService) { }

  updateCurso = () => {
    if (this.miFormulario.invalid) {
      this.hasEmptyFields();
      return;
    }
    const topic = this.miFormulario.value;
    console.log(topic)
    this.cursoService.putTopic(topic).subscribe(()=> {
      this.hide = false
      this.titulo = 'Detalle del curso'
      this.miFormulario.disable();
    })
  }

  private hasEmptyFields() {
    const firstInvalidControl = Object.keys(this.miFormulario.controls).find(
      control => this.miFormulario.get(control)?.invalid
    );
    if (firstInvalidControl) {
      const element = document.getElementById(firstInvalidControl);
      if (element) {
        element.focus();
      }
    }
  }

  ngOnInit(): void {
    this.formBuilders();
    this.getParams();
  }

  private formBuilders() {
    this.miFormulario = this.formBuilder.group({
      id:[],
      name: ['', Validators.required],
      linkImage: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  getCurso(id:number){
    this.cursoService.getTopicById(this.rutaId).subscribe(
      (data)=> {
      this.setFormValues(data.data)
      this.hiden();
    },
    (error:any)=> this.hiden())
  }
  setFormValues(valores: any) {
    this.miFormulario.setValue({
      id: valores.id,
      name: valores.name,
      linkImage: valores.linkImage,
      time: valores.time,
      description: valores.description
    });
  }
  hiden(){
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  private getParams() {
  this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id')?? '0');
      if (this.rutaId) {
        console.log('ID de la ruta:', this.rutaId);
        this.getCurso(this.rutaId)
      }
    });
  }
}
