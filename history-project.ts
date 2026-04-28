import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-project',
  imports: [CommonModule],
  templateUrl: './history-project.html',
  styleUrl: './history-project.scss',
})
export class HistoryProject {
public proary:any[]=[];
constructor(private servies:Serve, private cde:ChangeDetectorRef, private router:Router) { }  
ngOnInit(): void {
this.servies.history_project().then((data:any)=>{
this.proary=data;
this.cde.detectChanges();
});
}
}

