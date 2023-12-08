import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent {
@Input() Titulo: string = 'Mi titulo';
@Input() linkBack: string = '';
@Input() ButtonRigth!: any;
@Input() isSave: boolean = true;
@Input() tooltip: string = '';
@Input() tooltipBack: string = '';
@Input() hideIcon: boolean = true;




constructor(private router: Router) {
}

navigateToSave(){this.ButtonRigth()}
navigateToBack= ()=>{this.router.navigate([this.linkBack])}
}
