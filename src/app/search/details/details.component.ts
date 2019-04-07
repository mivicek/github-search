import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  //rezultati pretraživanja
  extracted: {};
  followers: {};

  user: string;

  userSubscription: Subscription;
  userFollowersSubscription: Subscription;

  //za pagination
  curPage: number = 1;
  pageSize: number = 10;
  maxPages: number;
  numberOfFollowers: number;

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,

    //koristi se direktno u templateu
    private router: Router
  ) {}

  ngOnInit() {

    //na ovaj način radi i ako se upiše u url
    this.user = "https://api.github.com/users/" + this.route.snapshot.paramMap.get('id');
    
    this.userSubscription = this.restService.getUser(this.user).subscribe((data: {}) => {
      this.extracted = data;
    }, error => {
      console.log(error);
    });

    this.userFollowersSubscription = this.restService.getFollowers(this.user + '/followers').subscribe((data: {}) => {
      this.followers = data;

      //za pagination
      this.numberOfFollowers = Object.keys(this.followers).length;
      this.maxPages = Math.ceil(this.numberOfFollowers / 10);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.userFollowersSubscription.unsubscribe();
  }
}


