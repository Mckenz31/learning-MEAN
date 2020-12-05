import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService} from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postSrv: PostService) { }

  ngOnInit(): void {
  }

  onCreate(f:NgForm){
    if(f.invalid){
      return;
    }
    const newPost:Post = {
      "title": f.value.postTitle, "content": f.value.postContent
    }
    this.postSrv.createPost(newPost);
    f.resetForm();
  }

}
