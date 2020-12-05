import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle = '';
  postContent = '';
  @Output() post = new EventEmitter<Post>();


  constructor() { }

  ngOnInit(): void {
  }

  onCreate(){
    const newPost:Post = {
      "title": this.postTitle, "content": this.postContent
    }
    this.post.emit(newPost);
  }

}
