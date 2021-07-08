import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";


export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username, password) {
   const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': '*'
      })
    };

    fetch("http://localhost:8762/user-ws/users/login", {
      method: 'POST', // 
      headers: {'Content-Type': 'application/json', 'charset': 'utf-8'},
      mode: 'no-cors', // 
      cache: 'no-cache', // 
      referrerPolicy: "no-referrer" ,
     
      body: JSON.stringify({
        email:username,
        password:password
    }) 
    })
    .then(function(response:any) {
      console.log(response);
      sessionStorage.setItem("username", username);
      let tokenStr = "Bearer " + response.token;
      sessionStorage.setItem("token", tokenStr);
     // return response.blob();
    });
    
  /*  return this.httpClient
      .post<any>("http://localhost:8762/user-ws/users/login",{
        email:username,
        password:password
    },httpOptions)
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );*/
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
