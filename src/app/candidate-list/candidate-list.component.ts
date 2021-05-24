import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CandidateService } from '../Services/CandidateService';
import { Candidate } from '../Model/Candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  private serviceSubscription: Subscription;
  private ErrorMessage: any;
  private candidateList: Candidate[];
  private filteredCandidateList: Candidate[];

  @Input()
  skillsSetRequiredForJob: string[];

  constructor(private candidateService: CandidateService) {

  }

  ngOnInit() {
    console.log(this.skillsSetRequiredForJob);
    this.serviceSubscription = this.candidateService.getCandidateList().subscribe({
      next: CandidateList => {
        this.candidateList = CandidateList;
        this.filterCandidatesBasedOnSkills();
      },
      error: err => this.ErrorMessage = err
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.skillsSetRequiredForJob && changes.skillsSetRequiredForJob.currentValue && this.candidateList) {
      this.filterCandidatesBasedOnSkills();
    }
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }

  filterCandidatesBasedOnSkills() {
    this.filteredCandidateList = this.candidateList.map(candidate => {
      return {
        id: candidate.id,
        name: candidate.name,
        skillTags: candidate.skillTags.filter(x => this.skillsSetRequiredForJob.indexOf(x) > 0),

      }
    }).filter(candidates => candidates.skillTags.length > 0).sort((a, b) => (a.skillTags.length > b.skillTags.length ? -1 : 1));
  }

}
