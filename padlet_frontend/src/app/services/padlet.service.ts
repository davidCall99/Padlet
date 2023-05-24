import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Padlet} from "../interfaces/padlet";
import {Entry} from "../interfaces/entry";
import {Rating} from "../interfaces/rating";
import {EntryComment} from "../interfaces/entryComment";


@Injectable({
  providedIn: 'root',
})
export class PadletService {
  private apiUrl = 'http://padlet2023.s2010456030.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getPadlets(): Observable<Padlet[]> {
    return this.http.get<Padlet[]>(`${this.apiUrl}/padlets`);
  }

  getEntries(padletId: string): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiUrl}/padlets/${padletId}/entries`);
  }

  getPadlet(id: string): Observable<Padlet> {
    return this.http.get<Padlet>(`${this.apiUrl}/padlets/${id}`);
  }

  getComments(entryId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/entries/${entryId}/comments`);
  }

  getRatings(entryId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/entries/${entryId}/ratings`);
  }

  createPadlet(padlet: Padlet): Observable<Padlet> {
    return this.http.post<Padlet>(`${this.apiUrl}/padlets`, padlet);
  }

  addRating(entryId: string, rating: number): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiUrl}/entries/${entryId}/ratings`, { rating: rating });
  }


  addComment(entryId: string, comment:EntryComment): Observable<Comment>{
    return this.http.post<Comment>(`${this.apiUrl}/entries/${entryId}/comments`, comment);
  }

  createEntry(padletId: string, entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${this.apiUrl}/padlets/${padletId}/entries`, entry);
  }

  deleteEntry(padletId: string, entryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/padlets/${padletId}/entries/${entryId}`);
  }

  deletePadlet(padletId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/padlets/${padletId}`);
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }

  updateEntry(entryId: string, content: string): Observable<Entry> {
    return this.http.put<Entry>(`${this.apiUrl}/entries/${entryId}`, { content: content });
  }

  getPrivatePadlets(): Observable<Padlet[]> {
    return this.http.get<Padlet[]>(`${this.apiUrl}/padlets/private`);
  }

  getPublicPadlets(): Observable<Padlet[]> {
    return this.http.get<Padlet[]>(`${this.apiUrl}/padlets/public`);
  }

  getSharedPadlets(userId: string): Observable<Padlet[]> {
    return this.http.get<Padlet[]>(`${this.apiUrl}/shared-padlets/${userId}`);
  }

  sharePadletWithEmail(padletId: string, email: string): Observable<Padlet> {
    const url = `${this.apiUrl}/share-padlet/${padletId}/email`;
    return this.http.post<Padlet>(url, {email: email});
  }









}
