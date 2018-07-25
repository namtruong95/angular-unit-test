import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ApiService } from './api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          preventDuplicates: true,
          enableHtml: true
        }),
      ],
      providers: [
        ApiService,
      ]
    });
  });

  it('should be created', inject([ApiService],
    (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
