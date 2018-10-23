import { Storage } from '@ionic/storage';
import { EndpointsProvider } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  public user: any = {};

  constructor(
    public endpoint: EndpointsProvider,
    public http: HttpClient,
    public storage: Storage
  ) {
  }

  login(email, password){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.login(email, password), {}).subscribe((data: any) => {
        this.user = data;
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  register(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.setUser(), data).subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getUserStorage(){
    return new Promise(resolve=>{
      this.storage.get('user').then(data=>{
        if(data)
          this.user = data;
        resolve(data);
      })
    })
  }

  getToken(){
    return this.user.SessionHash;
  }
}
