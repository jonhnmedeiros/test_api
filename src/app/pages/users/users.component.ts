import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(
    private usersService: UsersService,
    private route: Router,
    private modal: NzModalService,
  ) {
  }

  users: User[] = [];
  pages: number = 0;
  page: number = 1;
  totalPages: number = 0;
  usersResponse: any;
  loader: boolean = false;

  // Modal Edit User
  isVisible = false;
  isOkLoading = false;
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  };

  getUsers() {
    this.loader = true;
    this.usersService.getUsers(this.page).subscribe({
      next: response => {
        this.usersResponse = response;
        this.users = response.data;
        this.pages = response.total_pages;
        this.totalPages = response.total_pages;
      },
      error: () => {
        this.modal.error({
          nzTitle: 'Error',
          nzContent: 'An error occurred while fetching users',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false,
          nzOnOk: () => console.log('Ok')
        });
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  changePage(page: number) {
    this.page = page;
    this.getUsers();
  }

  viewUser(id: number) {
    this.route.navigate(['/users', id]);
  }

  deleteUser(id: number, name: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this user?',
      nzContent: `<b style="color: red;">${name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.usersService.deleteUser(id).subscribe({
        error: () => {
          this.modal.error({
            nzTitle: 'Error',
            nzContent: 'An error occurred while deleting the user',
            nzOkText: 'Ok',
            nzOkType: 'primary',
            nzOkDanger: false,
            nzOnOk: () => console.log('Ok')
          });
        },
        complete: () => {
          const modalSucess = this.modal.success({
            nzTitle: 'User deleted successfully',
            nzContent: 'User has been deleted successfully',
            nzOkText: 'Ok',
            nzOkType: 'primary',
            nzOkDanger: false,
            nzOnOk: () => console.log('Ok')
          });
          setTimeout(() => modalSucess.destroy(), 2000);
          this.getUsers();
        }
      }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  hadleEditUser(user: User) {
    this.user = user;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.usersService.updateUser(this.user).subscribe({
      error: () => {
        this.modal.error({
          nzTitle: 'Error',
          nzContent: 'An error occurred while updating the user',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false,
          nzOnOk: () => console.log('Ok')
        });
      },
      complete: () => {
        this.isVisible = false;
        this.isOkLoading = false;
        const modalSucess = this.modal.success({
          nzTitle: 'User updated successfully',
          nzContent: 'User has been updated successfully',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false,
          nzOnOk: () => console.log('Ok')
        });
        setTimeout(() => modalSucess.destroy(), 2000);
        this.getUsers();
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit() {
    this.getUsers();
  }
}
