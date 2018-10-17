import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalComponent } from './portal.component';
import { AuthService } from '../auth/auth.service';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ PortalComponent ],
        providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
