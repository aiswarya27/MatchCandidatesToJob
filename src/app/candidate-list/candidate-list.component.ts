import { Component, OnInit, OnDestroy,Input ,SimpleChanges, OnChanges} from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from '../Services/CandidateService';
import { Candidate } from '../Model/Candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit,OnDestroy {

  private serviceSubscription: Subscription;
  private ErrorMessage:any;
  private candidateList: Candidate[];
  private filteredCandidateList: Candidate[];

  @Input()
  skillsSetRequiredForJob:string[];

  constructor(private candidateService:CandidateService) { 
    
  }

  ngOnInit() {
    console.log(this.skillsSetRequiredForJob);
    this.serviceSubscription=this.candidateService.getCandidateList().subscribe({
      next:CandidateList=> {
        this.candidateList=CandidateList;
        this.filterCandidatesBasedOnSkills();
    },
      error:err=>this.ErrorMessage=err
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.skillsSetRequiredForJob && changes.skillsSetRequiredForJob.currentValue&&this.candidateList) {
      console.log(changes.skillsSetRequiredForJob.currentValue);     
      this.filterCandidatesBasedOnSkills(); 
    }
  }

  ngOnDestroy(){
    this.serviceSubscription.unsubscribe();
  }

  filterCandidatesBasedOnSkills(){
    //this.skillsSetRequiredForJob.every(jobSkills=>)
    this.filteredCandidateList = this.candidateList.filter(x => x.skillTags.some(candidateSkill=>
                              this.skillsSetRequiredForJob.indexOf(candidateSkill)>0));
    
     console.log(this.filteredCandidateList);
  

    

  }

}
