import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favorities } from './favorities';

describe('Favorities', () => {
  let component: Favorities;
  let fixture: ComponentFixture<Favorities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favorities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
