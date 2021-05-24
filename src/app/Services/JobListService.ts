import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/Common/http";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';
import {Job} from "../Model/Job";

@Injectable({
    providedIn:"root"
})
export class JobListService{
    private jobListUrl="http://private-76432-jobadder1.apiary-mock.com/jobs";

    constructor(private http:HttpClient)    {

    }
    getJobList():Observable<Job[]>{
        return this.http.get<Job[]>(this.jobListUrl).pipe(map((data:any)=> {                               
                    return  data.map((item:any)=> new Job(item.id,item.name,
                        item.company,item.skills.split(',')
                    ))
                }       
            ));               
    }
}

    