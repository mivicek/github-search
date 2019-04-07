import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService } from './rest.service';
import { Subject, Subscription } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchUrl: string = 'https://api.github.com/search/users?q=';

  //za unsubscribe kasnije
  usersSubscription: Subscription;

  //rezultat pretraživanja
  extracted = {};

  constructor(private restService: RestService) { }

  //ubacivanje keyworda
  onSubmit(form: NgForm) {
    this.restService.searchActivated = true;
    this.restService.currentKeyword = form.value.keyword;
    this.returnUsers(this.searchUrl + this.restService.currentKeyword);

  }

  //pretraživanja
  returnUsers(keyword) {
    this.usersSubscription = this.restService.getUsers(keyword).subscribe((data: {}) => {
      this.extracted = data;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    //za povratak iz details komponente
    if (this.restService.searchActivated) {
      this.returnUsers(this.searchUrl + this.restService.currentKeyword);
    }

  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }


}
