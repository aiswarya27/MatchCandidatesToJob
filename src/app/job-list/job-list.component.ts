import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobListService } from '../Services/JobListService';
import { Job } from '../Model/Job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public jobListDetails: Job[];
  public selectedJob: Job;
  private serviceSubscription: Subscription;
  private ErrorMessage: any;
  constructor(private jobListService: JobListService) { }

  ngOnInit() {

    this.serviceSubscription = this.jobListService.getJobList().subscribe({
      next: jobList => {
        this.jobListDetails = jobList;
      },
      error: err => this.ErrorMessage = err
    });
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }

  OnJobSelected() {

  }

}
