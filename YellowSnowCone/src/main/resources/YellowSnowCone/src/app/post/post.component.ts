import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Posts } from '../posts';
import { PostInteractions } from '../postinteractions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Posts[];
  postInteractions: PostInteractions[];

  post: {
    content: string;
    id1: any;
    id2: any;
  };

  postInteraction: {
    postId: number;
    type: number;
  };

  postContent = [];

  constructor(private postsService: PostsService, private userService: UserService) { }

  ngOnInit() {
    this.postsService.getPostsById(this.userService.getLoggedInUsers()[0].userid)
      .subscribe(data => this.posts = data, (error: any) => console.log(error), () => this.loadPosts());

    this.postsService.getInteractionsById(this.userService.getLoggedInUsers()[0].userid)
      .subscribe(data => this.postInteractions = data, (error: any) => console.log(error), () => this.loadInteractions());
  }

  loadPosts() {
    for (const i of this.posts) {
      this.post = {
        content: i.textcontents,
        id1: i.postid + 'like',
        id2: i.postid + 'dislike'
      };
      this.postContent.push(this.post);
    }
    this.postContent = this.postContent.reverse();
  }

  loadInteractions() {
    for (const i of this.postInteractions) {
      this.postInteraction = {
        postId: i.postid,
        type: i.type
      };
    }
  }

  like(likeimg: any): void {
    const img = document.getElementById(likeimg) as HTMLImageElement;

    if (img.src.split('/').pop() === 'snowconeshadow.png') {
      img.src = '../../assets/snowconelikeshadow.png';
    } else if (img.src.split('/').pop() === 'snowconelikeshadow.png') {
      img.src = '../../assets/snowconeshadow.png';
    }
  }

  dislike(dislikeimg: any): void {
    const img = document.getElementById(dislikeimg) as HTMLImageElement;

    if (img.src.split('/').pop() === 'snowconeshadowupsidedown.png') {
      img.src = '../../assets/snowconedislikeshadowupsidedown.png';
    } else if (img.src.split('/').pop() === 'snowconedislikeshadowupsidedown.png') {
      img.src = '../../assets/snowconeshadowupsidedown.png';
    }
  }
}
