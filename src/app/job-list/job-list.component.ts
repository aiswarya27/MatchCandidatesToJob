import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobListService } from '../Services/JobListService';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  private serviceSubscription: Subscription;
  private ErrorMessage:any;
  constructor(private jobListService:JobListService) { }

  ngOnInit() {
    this.serviceSubscription=this.jobListService.getJobList().subscribe({
      next:jobList=> {
        console.log(jobList); 
    },
      error:err=>this.ErrorMessage=err
    });
  }
  
  ngOnDestroy(){
    this.serviceSubscription.unsubscribe();
  }

}
