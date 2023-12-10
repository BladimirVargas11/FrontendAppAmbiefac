import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent {
@Input() hasActionView: any;
@Input() content: any ;
@Input() hasActionDelete: any;
@Input() delete: any;
@Input() hasActionUpdate: any;
@Input() update: any;
@Input() data: any;


ViewContent(id: any) {
  this.content(id);
}
  
OnDelete(id: any) {
    this.delete(id)
}
  
onUpdate(id: any) {
  this.update(id)
}

}
