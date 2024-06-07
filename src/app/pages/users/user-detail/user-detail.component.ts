import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  userID: any;
  user: any;
  loader: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService, private route: Router, private modal: NzModalService) { }

  viewUser(id: number) {
    this.loader = true;
    this.usersService.getUserById(id).subscribe({
      next: user => { this.user = user.data },
      error: () => {
        this.modal.error({
          nzTitle: 'Error',
          nzContent: 'An error occurred while fetching user',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false,
          nzOnOk: () => console.log('Ok')
        });
      },
      complete: () => {
        this.loader = false;
      }
    }
    );
  }

  goBack() {
    this.route.navigate(['/users']);
  }

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.paramMap.get("id");
    this.viewUser(this.userID);
  }
}
