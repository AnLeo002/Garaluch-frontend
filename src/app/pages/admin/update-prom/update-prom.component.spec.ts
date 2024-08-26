import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePromComponent } from './update-prom.component';

describe('UpdatePromComponent', () => {
  let component: UpdatePromComponent;
  let fixture: ComponentFixture<UpdatePromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
