import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { InformacionService } from '../../shared/services/informacion.service';
import { InformacionTema } from '../../shared/models/informacion';
import { ContenidoItem } from '../../shared/models/contenido';
import { TodoItem, todo } from '../../shared/models/tipoElements';



@Component({
  selector: 'app-informacion-tema',
  templateUrl: './informacion-tema.component.html',
  styleUrls: ['./informacion-tema.component.scss']
})
export class InformacionTemaComponent implements OnInit {
  rutaId: number = 0;
  todo: TodoItem[] = todo;
  done: ContenidoItem[] = [];
  errorMessages: string[] = [];
  titulo: string = 'Elementos de: '
  return = 'admin/consultar-curso'
  imagePreview: any;
  contentForm!: FormGroup;
  contentArray: FormArray;
  informacion: ContenidoItem[] = [];
  idCurso: number = 0;
  pathPrevious:string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router:Router,
    private informacionService: InformacionService,
    private el: ElementRef,) {
    this.contentArray = this.fb.array([]);
    this.contentForm = this.fb.group({
      contentArray: this.contentArray,
    });
    this.getParameters();
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.contentArray.controls, event.previousIndex, event.currentIndex);

      this.updatePositions();
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.container.data.length
      );
      this.SetControls(event, item.type);
      this.todo.push(item);
      this.updatePositions();
    }
  }

  get array() {
    return this.contentForm.get('contentArray')?.value
  }

  getUrlPrevious(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtén la ruta anterior usando el historial de navegación
        const previousUrl = this.router.url;
        console.log('Ruta anterior:', previousUrl);
      this.pathPrevious = previousUrl;
      }
    });
  }

  noReturnPredicate = () => false;

  private updatePositions() {
    this.contentArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1);
    });
  }
  private SetControls(event: CdkDragDrop<TodoItem[], TodoItem[], any>, type: string) {
    if (event.previousContainer !== event.container) {
      const newPosition = this.done.length;
      this.contentArray.setControl(newPosition, this.addFormContol(type, newPosition));
    }
  }


  deleteItem(index: number) {

    this.done.splice(index, 1);
    this.contentArray.removeAt(index);
  }
  addFormContol(item: string, position: number, data?: any): FormGroup {
    return this.fb.group({
      id: [data?.id],
      type: [item],
      title: [data?.title || ''],
      content: [data?.content || '', Validators.required],
      position: [data?.position || position],
    });
  }

  viewImage(index: number) {
    const imageFormGroup = this.contentArray.at(index) as FormGroup;
    return imageFormGroup.controls['content'].value
  }

  viewVideo(index: number) {
    const imageFormGroup = this.contentArray.at(index) as FormGroup;
    const videoLink = imageFormGroup.controls['content'].value;
    return (videoLink) ? this.sanitizer.bypassSecurityTrustResourceUrl(videoLink) : false;
  }

  ngOnInit(): void {
    this.getContent();
    console.log(this.done)
    this.getUrlPrevious();
  }

  saveElemts = async () => {
    if (this.validFrom()) {
      let newElements = this.hesNewElementsData()
      let updateElements = this.checkModifiedElements();
      
      if (newElements.length > 0)
         this.informacionService.postInformation({idSubtopic: this.rutaId, listInformation: newElements}).subscribe();
      if(updateElements.length > 0)
        this.informacionService.putInformation({listInformation: updateElements}).subscribe();

        setTimeout(() => {
          this.getContent();
        }, 1000);
    }
  }

  private validFrom() {
    const contentArray = this.contentForm.get('contentArray') as FormArray;
    let isValid = true;
    if (contentArray && contentArray.length > 0) {
      contentArray.controls.forEach((control: AbstractControl<any>, index: number) => {
        if (control instanceof FormGroup && control.invalid) {
          Object.keys(control.controls).forEach((key: string) => {
            const formControl = control.get(key);
            if (formControl && formControl.invalid) {
              console.error(`El elemento en la posición ${index + 1} - El control '${key}' está invalido: ${JSON.stringify(formControl.errors)}`);
              this.setFocusOnInvalidControl(key, index);
              isValid = false;
            }
          });
        }
      });
    }
    return isValid;
  }
  private setFocusOnInvalidControl(controlName: string, index: number) {
    const invalidControls = this.el.nativeElement.querySelectorAll(`[formcontrolname="${controlName}"]`);

    if (invalidControls && invalidControls.length > index) {
      const invalidControl = invalidControls[index] as HTMLElement;
      invalidControl.focus();
    }
  }
  hesNewElementsData(): any[] {
    const contentArray = this.contentForm.get('contentArray') as FormArray;
    return contentArray.controls
    .filter((control) => !control.get('id')?.value)
    .map((control) => {
      const { id, ...newElement } = control.value;
      return newElement;
    });
  }

  checkModifiedElements(): any[] {
    const contentArray = this.contentForm.get('contentArray') as FormArray;
    const modifiedElements = contentArray.controls
      .filter((control) => control.get('id')?.value)
      .filter((control) => {
        const originalElement = this.done.find(
          (element) => element.id === control.get('id')?.value
        );
        return JSON.stringify(originalElement) !== JSON.stringify(control.value);
      })
      .map((control) => control.value);

    return modifiedElements;
  }

  private getContent() {
    this.informacionService.getInformation(this.rutaId).subscribe(
      (data:any) => {
        this.informacion = data.data.sort((a:any, b:any) => a.position - b.position);
        while (this.contentArray.length !== 0) {
          this.contentArray.removeAt(0);
        }
        this.informacion.forEach((item: ContenidoItem, index) => {
          let fromArray = this.addFormContol(item.type, index, item)
          this.contentArray.push(fromArray);
        });
        this.done = this.array;
        console.log('Información recibida:', this.informacion);
      },
      (error) => {
        console.error('Error al obtener la información:', error);
      }
    );
  }

  private getParameters() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id') ?? '0', 10);
      console.log(this.router.routerState.snapshot.url);
      this.return = `admin/temas-cruso/${this.rutaId}/hola`
      if (!isNaN(this.rutaId)) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }
}
