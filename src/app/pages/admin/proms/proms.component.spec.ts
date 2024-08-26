import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromsComponent } from './proms.component';

describe('PromsComponent', () => {
  let component: PromsComponent;
  let fixture: ComponentFixture<PromsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
