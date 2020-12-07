import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  pageNumber = 2;
  pageSize = 5;

  constructor(private memberService: MembersService, private tostarService: ToastrService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe
    (
      response => {
        this.members = response.result;
        this.pagination = response.pagination;
      },
      error =>{
        this.tostarService.error(error.error);
      }
    )
  }

}
