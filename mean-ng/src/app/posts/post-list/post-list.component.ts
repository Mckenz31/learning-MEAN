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
  Postsubscription:Subscription;

  constructor(public postSrv: PostService) { }

  ngOnInit() {
    this.Postsubscription = this.postSrv.listPosts().subscribe((responz:Post[]) => {
      this.posts = responz;
    })
  }

  ngOnDestroy(){
    this.Postsubscription.unsubscribe();
  }

}
