import { TestBed, inject } from '@angular/core/testing';

import { BaseRootScopeService } from './base-root-scope.service';

describe('BaseRootScopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseRootScopeService]
    });
  });

  it('should be created', inject([BaseRootScopeService], (service: BaseRootScopeService) => {
    expect(service).toBeTruthy();
  }));
});
