import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

interface TodoItem {
  type: string;
  label: string;
  icon: string;
};
const todo: TodoItem[] = [
  {
    type: 'text',
    label: 'Texto',
    icon: 'text-icon',
  },
  {
    type: 'video',
    label: 'Video tuturial',
    icon: 'video-icon',
  },
  {
    type: 'image',
    label: 'Imagen',
    icon: 'image-icon',
  },
  
];
@Component({
  selector: 'app-informacion-tema',
  templateUrl: './informacion-tema.component.html',
  styleUrls: ['./informacion-tema.component.scss']
})
export class InformacionTemaComponent implements OnInit {
  rutaId: string | null = null;
  todo: TodoItem[] = todo;
  done: TodoItem[] = [];
  titulo: string =  'Elementos de: '
  imagePreview: any;
  contentForm!: FormGroup;
  contentArray: FormArray;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.contentArray = this.fb.array([]);
    this.contentForm = this.fb.group({
      contentArray: this.contentArray,
    });
  }
  
  drop(event: CdkDragDrop<TodoItem[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.contentArray.controls, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        // Inserta siempre al final del array de destino
        event.container.data.length
      );
      this.SetControls(event, item.type);
      this.todo.push(item);
    }
  }


  private SetControls(event: CdkDragDrop<TodoItem[], TodoItem[], any>, type:string) {
    if (event.previousContainer !== event.container) {
      this.contentArray.setControl(this.done.length, this.addFormContol(type));
    }
  }

  noReturnPredicate =() => false;

  deleteItem(index: number) {
    this.done.splice(index, 1);
    this.contentArray.removeAt(index);
  }
  addFormContol(item:string):FormGroup{
    switch (item) {
      case 'text':
        return  this.fb.group({
          type: [item],
          title: ['', Validators.required],
          description: ['', Validators.required]
        });
        break;

      case 'video':
        return  this.fb.group({
          type: [item],
          videoLink: ['', Validators.required]
        });
        break;

      case 'image':
        return  this.fb.group({
          type: [item],
          title: [''],
          imageFile: ['', Validators.required],
          viewImage: ['']
        });
        break;

      default:
        console.error('Tipo de elemento no reconocido');
        return this.fb.group({});
    }
    
  }
  
  previewImage(event: any, index: number): void {
    const file = event.target.files[0];
    debugger
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageFormGroup = this.contentArray.at(index) as FormGroup;
        imageFormGroup.controls['viewImage'].setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
viewImage(index:number){
  const imageFormGroup = this.contentArray.at(index) as FormGroup;
  return imageFormGroup.controls['viewImage'].value
}

viewVideo(index:number){
  const imageFormGroup = this.contentArray.at(index) as FormGroup;
  const videoLink = imageFormGroup.controls['videoLink'].value;

  // Marcar la URL como segura
  return this.sanitizer.bypassSecurityTrustResourceUrl(videoLink);
}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rutaId = params.get('id');
      if (this.rutaId) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }

  addElemts = () =>{
    console.log(this.contentForm);
  }
}
