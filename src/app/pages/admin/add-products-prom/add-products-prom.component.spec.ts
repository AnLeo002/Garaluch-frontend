import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsPromComponent } from './add-products-prom.component';

describe('AddProductsPromComponent', () => {
  let component: AddProductsPromComponent;
  let fixture: ComponentFixture<AddProductsPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductsPromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductsPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
