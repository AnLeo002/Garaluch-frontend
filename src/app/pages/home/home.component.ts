import { Component, OnInit} from '@angular/core';
import { PromService } from '../../services/prom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  promList:any=[];

  constructor(private promService:PromService){
  }

  ngOnInit(): void {
    this.promService.findAll().subscribe(
      (data:any)=>{
        this.promList = data;
      }
    )
  }

  info(){
    window.location.href="/info"
  }
}
