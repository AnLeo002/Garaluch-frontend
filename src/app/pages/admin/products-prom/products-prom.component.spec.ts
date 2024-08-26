import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPromComponent } from './products-prom.component';

describe('ProductsPromComponent', () => {
  let component: ProductsPromComponent;
  let fixture: ComponentFixture<ProductsPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
