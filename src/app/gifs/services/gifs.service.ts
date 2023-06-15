import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = []
  private apiKey = '5na5x2TW1sPLvFMb988BcbV3InAdUMtK'
  private url = 'https://api.giphy.com/v1/gifs/search'

  public gifList: Gif[] = []

  constructor(
    private http: HttpClient
  ) { }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag)
    }

    this._tagsHistory.unshift( tag )
    this._tagsHistory = this._tagsHistory.splice(0, 10)
  }

  searchTag( tag: string ): void {
    if (tag.length === 0) return

    this.organizeHistory( tag )

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>( this.url, { params })
      .subscribe({
        next: (response) => {
          this.gifList = response.data
          console.log({ gifList: this.gifList })
        }
      })
  }
}
