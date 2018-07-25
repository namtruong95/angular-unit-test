import { TestBed, inject } from '@angular/core/testing';

import { NotifyService } from './notify.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('NotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({
          preventDuplicates: true,
          enableHtml: true
        }),
      ],
      providers: [
        NotifyService,
      ]
    });
  });

  it('should be created', inject([NotifyService], (service: NotifyService) => {
    expect(service).toBeTruthy();
  }));
});
