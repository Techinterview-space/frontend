import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApplicationUser } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private api: ApiService) {}

  getMe(): Observable<ApplicationUser> {
    return this.api.get('/api/account/me');
  }
}
