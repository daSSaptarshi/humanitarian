import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import config from '../'
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = "/app/comment";
  private urls = {
    add         : `/add`,
    getAll      : `/getAll/`
}
  private isLoggedIn = false;

  httpService;

  constructor(public httpservice : HttpClient, configService : ConfigService ) {
    this.httpService = httpservice;
    this.baseUrl = `${configService.config.apiBaseURL}${this.baseUrl}`
   }

  addComment(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.add}`, data);
  }

  getComments(postId)
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAll}${postId}`);
  }
}
