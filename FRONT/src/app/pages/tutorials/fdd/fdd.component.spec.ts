import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDDComponent } from './fdd.component';

describe('TutorialsComponent', () => {
  let component: FDDComponent;
  let fixture: ComponentFixture<FDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FDDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
