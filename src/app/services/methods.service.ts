import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

  constructor() { }

  validateForm(object:any){
    for(let space in object){
      if(object[space] == '' || object[space] == null){
        Swal.fire("Complete todos los campos","","warning")
        return false;
      }
    }
    return true;
  }
  transformDate(date: any | null): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
