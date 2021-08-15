import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
   apiUrl="http://localhost:3000/tasks"
  constructor(private http:HttpClient) {
  }
  findAll(){
    return this.http.get<Task[]>(this.apiUrl)
  }
  deletetask(id:any){
    return this.http.delete(`${this.apiUrl}/${id}` )
  }
  persist(Task:any){
     return this.http.post<Task>(this.apiUrl,Task)
  }
  toggle(id:any,completed:any){
     return this.http.patch(`${this.apiUrl}/${id}`,{completed:!completed})
  }
  update(task:any){
     return this.http.put(`${this.apiUrl}/${task.id}`,task )
  }
}
