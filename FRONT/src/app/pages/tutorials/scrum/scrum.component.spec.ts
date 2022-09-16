import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrum } from './scrum.component';

describe('TutorialsComponent', () => {
  let component: Scrum;
  let fixture: ComponentFixture<Scrum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scrum ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scrum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
