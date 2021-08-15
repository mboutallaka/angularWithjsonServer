import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/Task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:Task[]=[];
  resultTasks:Task[]=[];
  myTask:{ label: string; completed: boolean }={label:'', completed:false}
  Task: any;
  editForm= false;
  showForm=false;
  searchText= "";
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks()
  }
 getTasks(){
    this.taskService.findAll()
      .subscribe(data=>
       {this.resultTasks=this.tasks=data
    })
 }

  OnDeleteTask(id:any) {
    this.taskService.deletetask(id)
      .subscribe(()=>{
        this.tasks=this.tasks.filter(Task=> Task.id !=id)
      })
  }
  OnPersistTask(){
     this.taskService.persist(this.myTask)
       .subscribe((Task)=>{
      this.tasks=[Task, ...this.tasks]
         this.resetTask()
         this.showForm=false
    })
  }
  resetTask(){
     this.myTask={
       label:'',
       completed:false
     }
  }
  OnToggle(Task:any){
     this.taskService.toggle(Task.id,Task.completed)
       .subscribe(()=>{
         Task.completed=!Task.completed
       })
  }
  editTask(Task:any){
     this.myTask=Task
    this.editForm=true
  }

  updateTask(Task: any) {
  this.taskService.update(this.myTask)
    .subscribe(task=>{
      this.resetTask();
      this.editForm=false
    })
  }
  searchTask(){
    this.resultTasks=this.tasks.filter((task)=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }
}
