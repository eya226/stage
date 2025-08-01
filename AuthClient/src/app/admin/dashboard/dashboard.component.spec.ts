import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('AdminDashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getAdminData']);

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ CommonModule ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch admin data on init', () => {
    const testData = 'Admin Test Data';
    dataService.getAdminData.and.returnValue(of(testData));

    fixture.detectChanges(); // ngOnInit() is called

    expect(dataService.getAdminData).toHaveBeenCalled();

    const p = fixture.debugElement.query(By.css('p:last-child')).nativeElement;
    expect(p.textContent).toContain(testData);
  });
});
