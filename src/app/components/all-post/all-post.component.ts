import { Posts } from './../../interface/models';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JsonplaceholderService } from './../../service/jsonplaceholderService.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  posts: Posts[];


  constructor(private server: JsonplaceholderService) { }

  ngOnInit() {
    // просле загрузки страницы віводим посты
    this.server.getTasks().subscribe((data: Posts[]) => {
      if (data) {
        this.posts = data;
      }
    }, error => {
      console.log(error);
    });
    //После измининия говорим подписчику добавить новый пост в начало масива и обновить посты
    this.server.postsObservableSubject.subscribe((data: Posts[]) => {
      if (data['body']) {
        this.posts.unshift(data['body']);
      }
    });
    //После отредактирования говорим подписчику поменять тайтл на новый
    this.server.postsObservableUpdateSubject.subscribe((date: Posts[]) => {
      if (date['body']) {
        this.posts = this.posts.map(item => {
          if (item.id === date['id']) {
            item.title = date['body']['title'];
          }
          return item;
        });
      }
    });
  }
  //Удаление поста
  public deletePost(id) {
    this.server.deleteTask(id).subscribe((data: Posts) => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }
  //Редактирование  поста
  public editPost(post: Posts) {
    this.server.emitEditPost(post);
  }
}
