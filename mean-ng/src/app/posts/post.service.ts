import { Injectable, OnInit } from '@angular/core';
import { Post } from './post.model';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.http.post<{message:string, posts:Post[]}>('http://localhost:3000/posts', data ).subscribe((response) => {
      console.log(response.message);
      this.posts.push(data);
      this.postAdded.next([...this.posts]);
    })
  }

  fetchPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/posts')
    //Transforming _id to id before we represent our data
    .pipe(map((getData => {
        return getData.posts.map(response => {
          return {
            id: response._id,
            title: response.title,
            content: response.content
          }
        })
    })))
    .subscribe((postData) => {
      this.posts = postData
      this.postAdded.next([...this.posts]);
    })
  }

  listPosts(){
    return this.postAdded.asObservable();
  }

  deletePost(id){
    this.http.delete('http://localhost:3000/posts/' +id).subscribe(response => {
      console.log('Post Delete');
      this.posts = this.posts.filter(posts => posts.id !== id);
      this.postAdded.next([...this.posts]);
    })
  }
}
