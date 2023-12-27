import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errores } from 'src/app/Core/Models/errors';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  
  @Input() error: any = {};
  typeCode: string = '';
  
  constructor(private route: Router){}
  ngOnInit(): void {
    this.settypeCode()
  }
  settypeCode() {
    this.typeCode = errores.find(x=> x.status === this.error?.status)?.link || '';
  }
  navigateTo() {
    this.route.navigate(['/'])
    }
}
