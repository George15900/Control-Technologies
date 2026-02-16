import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acc-leave-view',
  imports: [CommonModule,RouterLink],
  templateUrl: './acc-leave-view.html',
  styleUrl: './acc-leave-view.scss',
})
export class AccLeaveView {
public leave:any[]=[];
constructor(private servies: Serve, private cde: ChangeDetectorRef, private router: Router) { }

ngOnInit(): void {

  
    this.servies.emp_leave_view().then((stateData: any) => {

      // ✅ Check data is array
      if (Array.isArray(stateData)) {

        // ✅ Filter jobs requested to join
        this.leave = stateData.filter(item =>
        item.apply_status === 'Approved'
        );
        console.log("job",this.leave);

      } else {
        this.leave = [];
      }

      this.cde.detectChanges();
    })
    .catch((error) => {
      console.error('Error fetching leave:', error);
    });

  }

}
