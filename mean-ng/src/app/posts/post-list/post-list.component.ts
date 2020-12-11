import { Component, OnDestroy, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts:Post[] = [];
  postSubscription:Subscription;

  constructor(public postSrv: PostService) { }

  ngOnInit() {
    this.postSrv.fetchPosts();
    this.postSubscription = this.postSrv.listPosts().subscribe((responz:Post[]) => {
      this.posts = responz;
    })
  }

  onDelete(id:string){
    this.postSrv.deletePost(id);
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }

}
