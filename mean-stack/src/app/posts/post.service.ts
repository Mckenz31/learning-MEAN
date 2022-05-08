import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable ({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient){}

  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  getPost(){
    // return this.updatedPosts.asObservable();
    this.http.get<{message: string, post: any}>('http://localhost:3000/api/posts')
    .pipe(map(
      (data) => {
        return data.post.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }
    ))
    .subscribe(
      (postData) => {
        this.posts = postData;
        this.updatedPosts.next([...this.posts]);
      }
    );
  }

  getUpdatedPost(){
    return this.updatedPosts;
  }

  addPost(title: string, content: string){
    const post = {
      id: null,
      title: title,
      content: content
    }
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', post).subscribe(
      (data) => {
        const id = data.id;
        post.id = id;
        this.posts.push(post);
        
        this.updatedPosts.next([...this.posts]);
      }
    );
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(
      () => {
        const filteredPosts = this.posts.filter(post =>
          post.id !== postId
        );
        console.log(filteredPosts)
        this.posts = filteredPosts;
        this.updatedPosts.next([...this.posts]);
      }
    )

  }

}
