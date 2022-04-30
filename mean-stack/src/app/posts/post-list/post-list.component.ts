import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription  } from "rxjs";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})

export class PostListComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  private postSubscription: Subscription;

  constructor(public postService: PostService){  }

  ngOnInit() {
    this.postSubscription = this.postService.getPost().subscribe(
      (postz: Post[]) => {
        this.posts = postz;
      }
    )
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
