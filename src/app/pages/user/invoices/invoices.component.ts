import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit{
  constructor(private invoiceService: InvoiceService,private login:LoginService){}
  invoices:any = []
  ngOnInit(): void {
    this.invoiceService.findInvoicesByUsername(this.login.getUser().username).subscribe((data:any)=>{
      this.invoices = data;
    })
  }
  invoicesEmpty(){
    if(this.invoices.length == 0){
      return true;
    }
    return false;
  }

}
