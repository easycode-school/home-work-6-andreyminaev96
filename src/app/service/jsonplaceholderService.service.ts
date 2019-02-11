import { Posts } from './../interface/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {
  private apiUrl: string = environment.apiUrl;
  private posts: Posts[] = [
    {
      id: 0,
      title: '',
      userId: 0
    }
  ];
  //Подписка на получение постов
  private _postsSource = new BehaviorSubject(this.posts);
  public postsObservableSubject = this._postsSource.asObservable();
  //Подписка на редактрирование постов
  private _editPostSourse = new BehaviorSubject(this.posts);
  public postsObservableEditSubject = this._editPostSourse.asObservable();
  //Подписка на обновление
  private _updatePostSourse = new BehaviorSubject(this.posts);
  public postsObservableUpdateSubject = this._updatePostSourse.asObservable();
  constructor(
    private http: HttpClient
  ) { }
  //Емитим новый пост
  public emitNewPost(post) {
    this._postsSource.next(post);
  }
  //Емитим новый отредаткироватый пост
  public emitEditPost(post) {
    this._editPostSourse.next(post);
  }
  //Емитим новый отредаткироватый пост
  public emitUpdatePost(post) {
    this._updatePostSourse.next(post);
  }
   //Запрос на получение постов
  public getTasks() {
    return this.http.get(`${this.apiUrl}/posts`);
  }
  //Запрос на Удаление постов
  public deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }
  //Запрос на добавление постов
  public addPost(post: Posts) {
    return this.http.post(`${this.apiUrl}/posts/`, {
      body: post
    });
  }
  //Запрос на редактирования постов
  public editPost(post: Posts) {
    return this.http.put(`${this.apiUrl}/posts/${post.id}`, {
      body: post
    });
  }
}
