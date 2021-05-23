import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/Common/http";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';
import {Candidate} from "../Model/Candidate";

@Injectable({
    providedIn:"root"
})
export class CandidateService{
    private candidateListUrl="http://private-76432-jobadder1.apiary-mock.com/candidates";

    constructor(private http:HttpClient)    {

    }
    getCandidateList():Observable<Candidate[]>{
        return this.http.get<Candidate[]>(this.candidateListUrl);
    //     .pipe(map((data:any)=> {                               
    //         return  data.map((item:any)=> new Candidate(item.candidateId,item.name,
    //             item.skillTags))
    //     }       
    // ));
    }
}

    