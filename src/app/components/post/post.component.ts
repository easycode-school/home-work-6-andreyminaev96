import { Posts } from './../../interface/models';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JsonplaceholderService } from './../../service/jsonplaceholderService.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: Posts;
  @Output() deleteNewPost = new EventEmitter();
  @Output() editNewPost = new EventEmitter();

  constructor( private server: JsonplaceholderService ) { }
  // Удаление пост
  public deletePost() {
    this.deleteNewPost.emit(this.post.id);
  }
  // Изминеный пост
  public editPost() {
    const updatePost = Object.assign({}, this.post);
    this.editNewPost.emit(updatePost);
  }

}
