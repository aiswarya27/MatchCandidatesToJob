import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from '../Services/CandidateService';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit,OnDestroy {

  private serviceSubscription: Subscription;
  private ErrorMessage:any;
  constructor(private candidateService:CandidateService) { }

  ngOnInit() {
    this.serviceSubscription=this.candidateService.getCandidateList().subscribe({
      next:CandidateList=> {
        console.log(CandidateList); 
    },
      error:err=>this.ErrorMessage=err
    });
  }
  
  ngOnDestroy(){
    this.serviceSubscription.unsubscribe();
  }

}
