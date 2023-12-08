import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() list: any[] = [];
  currentPage = 1;
  pageSize = 5;
  isLimited: boolean = true;
  paginas!: any[];
  constructor() {
    this.paginas = this.paginasArray;
  }
  get numeroDePaginas(): number {
    return Math.ceil(this.list.length / this.pageSize);
  }

  get paginasArray(): number[] {
    return Array(this.numeroDePaginas).fill(0).map((_, index) => index + 1);
  }

  getSeleccionarPagina(paginaSeleccionada: number) {
    this.currentPage = paginaSeleccionada + 1;
    this.ChangeLimited()
    this.emitCurrentPage();
  }

  OnNext() {
    let valor = Math.ceil(this.list.length / this.pageSize)
    if (this.currentPage <= valor) {
      this.currentPage++;
      this.emitCurrentPage();
    }
    this.ChangeLimited();
  }

  private ChangeLimited = () => this.isLimited = (this.currentPage == this.numeroDePaginas)? !this.isLimited: true;

  OnPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitCurrentPage();
    }
    this.ChangeLimited()
  }

  private emitCurrentPage() {
    this.currentPageChange.emit(this.currentPage);
  }

}



