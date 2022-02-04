import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import {profileData} from '../shared/model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user:  profileData[] = [];
  i = 0;
  isLoading= false;


  constructor( private http: HttpClient,
    private toasterService: NbToastrService) {
  }

ngOnInit(){
  this.getUserList();
}
  getUserList(): void{
    this.http.get<any>('assets/Matches.JSON')
    .pipe(
      debounceTime(2000))
    .subscribe((data: any) => {
      this.user = data.Matches;
    });
  }

  showNotIntrest() {
    this.isLoading =true;
    if (this.i === this.user.length-1) {
      this.i = 0;
    } setTimeout(() => {
      this.isLoading = false
    }, 1000);
    
    this.i ++;
    this.toasterService.danger('Not Intrested');
  }
  showIntrest() {
    this.isLoading =true;
    if (this.i === this.user.length-1) {
      this.i = 0;
    }  setTimeout(() => {
      this.isLoading = false
    }, 1000);
    this.i ++;
    this.toasterService.success('Intrested');
  }
  
}


