import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJumbotron } from './search-jumbotron';

describe('SearchJumbotron', () => {
  let component: SearchJumbotron;
  let fixture: ComponentFixture<SearchJumbotron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchJumbotron]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchJumbotron);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
