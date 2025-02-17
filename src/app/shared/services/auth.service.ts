import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Models/User.model';
import { Router } from '@angular/router';
import { baseUrl } from './baseUrl';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private Router: Router) {}
  regComplete: boolean = false;
  boolChange = new EventEmitter<boolean>();

  user: string;
  backUpUser: any;
  userName: string;
  backupUserName: any;
  public correct: boolean;
  public information: {};

  regForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    QuestionOne: new FormControl('', Validators.required),
    QuestionTwo: new FormControl('', Validators.required),
    QuestionThree: new FormControl('', Validators.required),
    AnswerOne: new FormControl('', Validators.required),
    AnswerTwo: new FormControl('', Validators.required),
    AnswerThree: new FormControl('', Validators.required),
  });

  signInForm = new FormGroup({
    Email: new FormControl('', [Validators.email, Validators.required]),
    Answer: new FormControl('', Validators.required),
  });

  registerNewUser(body: any): Observable<UserModel> | void {
    this.http
      .post<UserModel>(`${baseUrl}user`, body)
      .subscribe((response: any) => {
        return response.status ? this.boolChange.emit(true) : null;
      });
  }

  getQuestions(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${baseUrl}user/${email}`).pipe(
      tap((data) => {
        this.user = data['user'];
        this.backUpUser = sessionStorage.setItem('user', data['user']);
        this.information = data;
      })
    );
  }

  answerQuestion(value : string) {
    this.correct = true;

    if (this.signInForm.controls['Answer'].value === value) {
      this.Router.navigate(['/dashboard']);
      return (this.correct = true);
    } else {
      return (this.correct = false);
    }
  }

  getUserName(): Observable<any> | any {
    this.http
      .get<any>(
        `${baseUrl}users/${this.user || sessionStorage.getItem('user')}`
      )
      .subscribe((data) => {
        this.userName = data.name;
        this.backupUserName = sessionStorage.setItem('username', data.name);
      });
  }

  userSignOut() {
    sessionStorage.clear();
    this.user = '';
    this.Router.navigate(['/']);
  }
}
