import { Injectable, OnInit } from '@angular/core';
import { Post } from './post.model';
import {Subject} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{

  private posts: Post[] = [];
  private postAdded = new Subject<Post[]>();

  constructor(private http:HttpClient){}

  ngOnInit(){}

  createPost(data){
    this.http.post<{message:string}>('http://localhost:3000/posts', data ).subscribe((response) => {
      console.log(response.message);
      this.posts.push(data);
      this.postAdded.next([...this.posts]);
    })
  }

  fetchPosts(){
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/posts').subscribe((response) => {
      this.posts = response.posts;
      this.postAdded.next([...this.posts]);
    })
  }

  listPosts(){
    //asObservable? gives us an object to which we can listen to but not update!
    return this.postAdded.asObservable();
  }

}
