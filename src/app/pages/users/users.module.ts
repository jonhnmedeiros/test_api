import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';



@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzInputModule
  ],
  declarations: [UsersComponent, UserDetailComponent],
  exports: [UsersComponent]
})
export class UsersModule { }
