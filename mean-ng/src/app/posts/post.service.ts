import { Injectable, OnInit } from '@angular/core';
import { Post } from './post.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{

  private posts: Post[] = [];
  private postAdded = new Subject<Post[]>();

  ngOnInit(){}

  createPost(data){
    this.posts.push(data);
    this.postAdded.next([...this.posts]);
  }

  listPosts(){
    //asObservable? gives us an object to which we can listen to but not update!
    return this.postAdded.asObservable();
  }

}
