import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getQuiz() {
    let quiz = { id: 'data/angularJS.json', name: 'AngularJS' };
    return quiz;
  }
}