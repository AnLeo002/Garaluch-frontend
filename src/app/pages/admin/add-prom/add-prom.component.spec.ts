import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromComponent } from './add-prom.component';

describe('AddPromComponent', () => {
  let component: AddPromComponent;
  let fixture: ComponentFixture<AddPromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
