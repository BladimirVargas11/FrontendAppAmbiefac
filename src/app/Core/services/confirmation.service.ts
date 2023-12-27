import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/Shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private modalService: NgbModal) {}

  openConfirmationModal(message: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { centered: true });
    modalRef.componentInstance.message = message;

    return modalRef.result.then((result) => {
      return result === 'confirm';
    });
  }
}
