import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PromService } from '../../../services/prom.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.css'
})
export class ViewInvoiceComponent implements OnInit{

  invoice:any;

  constructor(private invoiceService:InvoiceService,private activatedRoute:ActivatedRoute, private productService:ProductService, private promService:PromService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.invoiceService.findInvoiceWithCompletePro(params['id']).subscribe(data=>{
        this.invoice = data;
        console.log(data);
        
      })
    })
  }
}
