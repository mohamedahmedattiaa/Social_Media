import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserData } from './user-data';

describe('UserData', () => {
  let component: UserData;
  let fixture: ComponentFixture<UserData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
