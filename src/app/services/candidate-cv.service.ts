import { Injectable } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Observable } from 'rxjs';
import { ApiService, HttpOptions } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateCvService {
  private readonly root = '/api/candidate-cv/';
  constructor(private readonly api: ApiService) {}

  upload(cardId: string, cv: File): Observable<CandidateCard> {
    const formData = new FormData();
    formData.append('file', cv, cv.name);
    return this.api.post<CandidateCard>(this.root + cardId + '/upload', formData);
  }

  download(cardId: string, fileId: string): Observable<File> {
    const httpOptions: HttpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.api.get<File>(this.root + `${cardId}/download/${fileId}`, httpOptions);
  }

  delete(cardId: string, fileId: string): Observable<CandidateCard> {
    return this.api.delete<CandidateCard>(this.root + `${cardId}/delete/${fileId}`);
  }
}
