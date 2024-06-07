import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User, UserResponse } from './user.model';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    readonly RequestURL = 'https://reqres.in/api';

    constructor(private http: HttpClient) { }

    getUsers(page: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.RequestURL}/users?page=${page}`);
    }

    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.RequestURL}/users/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.RequestURL}/users`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.RequestURL}/users/${user.id}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.RequestURL}/users/${id}`);
    }
}