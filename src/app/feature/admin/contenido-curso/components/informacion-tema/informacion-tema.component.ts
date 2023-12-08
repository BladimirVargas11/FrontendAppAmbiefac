import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  rutaId: number | null = null;
  todo: TodoItem[] = todo;
  done: ContenidoItem[] = [];
  errorMessages: string[] = [];
  titulo: string = 'Elementos de: '
  imagePreview: any;
  contentForm!: FormGroup;
  contentArray: FormArray;
  informacion: ContenidoItem[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private informacionService: InformacionService,
    private el: ElementRef,) {
    this.contentArray = this.fb.array([]);
    this.contentForm = this.fb.group({
      contentArray: this.contentArray,
    });
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
    
    this.informacionService.deleteData(this.rutaId?? 0,this.done[index].id);
    this.done.splice(index, 1);
    this.contentArray.removeAt(index);
  }
  addFormContol(item: string, position: number, data?: any): FormGroup {
    return this.fb.group({
      id: [data?.id],
      type: [item],
      title: [data?.title || ''],
      InfoContent: [data?.InfoContent || '', Validators.required],
      position: [data?.position || position],
    });
  }

  viewImage(index: number) {
    const imageFormGroup = this.contentArray.at(index) as FormGroup;
    return imageFormGroup.controls['InfoContent'].value
  }

  viewVideo(index: number) {
    const imageFormGroup = this.contentArray.at(index) as FormGroup;
    const videoLink = imageFormGroup.controls['InfoContent'].value;
    return (videoLink) ? this.sanitizer.bypassSecurityTrustResourceUrl(videoLink) : false;
  }

  ngOnInit(): void {
    this.getParameters();
    this.getContent();
    console.log(this.done)
  }

  saveElemts = () => {
    if (this.validFrom()) {
      let newElements = this.hesNewElementsData()
      let updateElements = this.checkModifiedElements();
      debugger
      if(newElements.length>0)
        this.informacionService.addData(this.rutaId ?? 0,newElements);
      if(updateElements.length>0)
        this.informacionService.updateDataArray(this.rutaId ?? 0,updateElements);

      console.log('Nuevos: ', newElements);
      console.log('Modificados: ',updateElements);
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
      .map((control) => control.value);
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
    this.informacionService.getData(this.rutaId?? 0).subscribe(
      (data) => {
        this.informacion = data;
        while (this.contentArray.length !== 0) {
          this.contentArray.removeAt(0);
        }
        this.informacion.forEach((item, index) => {
          this.contentArray.push(this.addFormContol(item.type, index, item));
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
      this.rutaId = parseInt(params.get('id')?? '0', 10);
      if (!isNaN(this.rutaId)) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }
}
