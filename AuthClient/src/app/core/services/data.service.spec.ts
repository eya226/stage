import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/api/data';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch admin data', () => {
    const mockData = 'Admin Data';
    service.getAdminData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(`${apiUrl}/admin`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch post1 data', () => {
    const mockData = 'Post1 Data';
    service.getPost1Data().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(`${apiUrl}/post1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
