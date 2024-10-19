import { Component, OnInit} from '@angular/core';
import { PromService } from '../../services/prom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  promList:any=[];
  currentSlide:number = 0;
  totalSlides: number = 3;

  constructor(private promService:PromService){
  }

  ngOnInit(): void {
    this.autoSlide()
    this.promService.findAll().subscribe(
      (data:any)=>{
        this.promList = data;
      }
    )
  }
  autoSlide():void{
    setInterval(()=>{
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;//El %(modulo) fuciona como freno para que cuando se llegue al ultimo slider se regrese al primer slider ej 2 + 1 = 3 // 3 % 3 = 0 este es el index
    },5000)
  }
  goToSlide(index:number){
    this.currentSlide = index;
  }
}
