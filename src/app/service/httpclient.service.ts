import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class User {
  constructor(
    public empId: string,
    public name: string,
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getUser() {
    return this.httpClient.get<User[]>("http://localhost:8080/users");
  }

  public deleteUser(employee) {
    return this.httpClient.delete<User>(
      "http://localhost:8080/user" + "/" + employee.empId
    );
  }

  public createUser(employee) {
    return this.httpClient.post<User>(
      "http://localhost:8080/user",
      employee
    );
  }
}
