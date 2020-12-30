import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService} from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public mode:string = 'create';
  postID: string;
  post: Post

  constructor(public postSrv: PostService, private activRoute: ActivatedRoute) { }

  ngOnInit(){
    //Check whether you are in the edit mode or not
    //If you are in the edit mode, the post which you wanted to edit is displayed from the post-list that you clicked on
    this.activRoute.paramMap.subscribe((param: ParamMap) => {
      if(param.has('postId')){
        this.mode = 'edit';
        this.postID = param.get('postId');
        //Getting the post
        this.postSrv.getPost(this.postID).subscribe(response => {
          this.post = {id: response._id, title: response.title, content:response.content};
        });
        // console.log(this.postID);
      }
      else{
        this.mode = 'create';
        this.postID = null;
      }
    })
  }

  onCreate(f:NgForm){
    if(f.invalid){
      return;
    }
    if(this.mode === "create"){
      this.postSrv.createPost(f.value.postTitle, f.value.postContent);
      f.resetForm();
    }
    else{
      this.postSrv.updatePost(this.postID, f.value.postTitle, f.value.postContent);
      f.resetForm();
    }
  }

}
