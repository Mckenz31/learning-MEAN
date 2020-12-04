import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle = '';
  postContent = '';
  newPost: any = {};
  @Output() post = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onCreate(){
    this.newPost = {
      "title": this.postTitle, "content": this.postContent
    }
    this.post.emit(this.newPost);
  }

}
