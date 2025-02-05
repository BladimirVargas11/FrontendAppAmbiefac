import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavigationHistoryService } from '../../services/navigation-history.service';

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




constructor(private router: Router, private location:Location,  private navigationHistoryService: NavigationHistoryService) {
}

navigateToSave= ()=> {this.ButtonRigth()}
navigateToBack= ()=>{ 
  if (this.linkBack) {
  this.router.navigate([this.linkBack]);
} else {
  this.navigationHistoryService.navigateBack();
}}
}
