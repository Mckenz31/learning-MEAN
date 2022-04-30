import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from '../post.model';
import { PostService } from "../post.service";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{

  constructor(public postService: PostService){

  }

  onAddPost(formData: NgForm){
    if(formData.invalid){
      return;
    }
    this.postService.addPost(formData.value.title, formData.value.content);
    formData.resetForm();
  }
}
