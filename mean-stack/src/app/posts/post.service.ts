import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable ({providedIn: 'root'})
export class PostService {

  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  getPost(){
    return this.updatedPosts.asObservable();
  }

  addPost(title: string, content: string){
    const post = {
      title: title,
      content: content
    }
    this.posts.push(post);
    this.updatedPosts.next([...this.posts]);
  }

}
