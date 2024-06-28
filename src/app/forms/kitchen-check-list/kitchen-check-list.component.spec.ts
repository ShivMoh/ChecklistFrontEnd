import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCheckListComponent } from './kitchen-check-list.component';

describe('KitchenCheckListComponent', () => {
  let component: KitchenCheckListComponent;
  let fixture: ComponentFixture<KitchenCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenCheckListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
