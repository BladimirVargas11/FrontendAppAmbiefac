import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalbody',
  templateUrl: './modalbody.component.html',
  styleUrls: ['./modalbody.component.scss']
})
export class ModalbodyComponent {

  @Input() modalTitle: string = 'Modal Title';
  @Input() modalContent: string = 'Modal Content';
  @Input() content: any;
  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }
}
