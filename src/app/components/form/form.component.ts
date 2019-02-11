import { Posts } from './../../interface/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { JsonplaceholderService } from './../../service/jsonplaceholderService.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  isEdit: boolean;
  idPost: number;
  title;

  constructor(private server: JsonplaceholderService) { }

  ngOnInit() {
    // Реактивная валидацыя формы)
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
    this.server.postsObservableEditSubject.subscribe((data: Posts[]) => {
      if (data['title']) {
        this.isEdit = true;
        this.title = data['title'];
        this.idPost = data['id'];
      }
    });
  }
  // Добавление нового поста с формы
  public addNewPost() {
    const newPost = {
      userId: 1,
      title: this.title
    };
    this.server.addPost(newPost).subscribe((data: Posts) => {
        this.form.reset();
        this.server.emitNewPost(data);
    });
  }
  // Изминение поста с формы
  public editPost() {
    const updatePost = {
      id: Number( this.idPost),
      userId: 1,
      title: this.title
    };
    this.server.editPost(updatePost).subscribe((date: Posts) => {
      this.form.reset();
      this.server.emitUpdatePost(date);
      this.isEdit = false;
    });
  }


}
