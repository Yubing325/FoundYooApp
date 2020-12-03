import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];

  constructor(private memberService: MembersService, private tostarService: ToastrService) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe
    (
      result => {
        this.members = result
      },
      error =>{
        this.tostarService.error(error.error);
      }
    )
  }

}
