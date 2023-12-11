import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericLocalService<T extends { id?: number }> {
  public localStorageKey: string =  'item';

  constructor() {
  }

  private getNextId(items: T[]): number {
    const maxId = items.reduce((max, item) => (item.id && item.id > max ? item.id : max), 0);
    return maxId + 1;
  }

  getAllItems(): T[] {
    const itemsString = localStorage.getItem(this.localStorageKey);
    return itemsString ? JSON.parse(itemsString) : [];
  }

  saveItem(item: T): Observable<number> {
    const items = this.getAllItems();
    const id = this.getNextId(items);
    const newItem = { ...item, id };
    items.push(newItem);
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
    return of(id);
  }

  updateItem(updatedItem: T): void {
    const items = this.getAllItems();
    const index = items.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(this.localStorageKey, JSON.stringify(items));
    }
  }

  getItemById(id: number): T | undefined {
    const items = this.getAllItems();
    return items.find((item) => item.id === id);
  }

  deleteItemById(id: number): void {
    let items = this.getAllItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }
}
