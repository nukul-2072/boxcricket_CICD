import { Component } from '@angular/core';
import { SlotservService } from './slotserv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent {
  public available: boolean[] = [];

  public booked: boolean[] = [];

  // public bookedslotname: string[] = [];
  public curbookedslot: {slotI:Number,SlotName:string};
  public bookedslot: {slotI:Number,SlotName:string}[] = [];


  public bookedslotId: number[] = [];

  public TotalBill:number = 0;
  public slotname: any[] = [
    { Slotid: 1, Slotname: '00:00 - 01:00' },
    { Slotid: 2, Slotname: '01:00 - 02:00' },
    { Slotid: 3, Slotname: '02:00 - 03:00' },
    { Slotid: 4, Slotname: '03:00 - 04:00' },
    { Slotid: 5, Slotname: '04:00 - 05:00' },
    { Slotid: 6, Slotname: '05:00 - 06:00' },
    { Slotid: 7, Slotname: '06:00 - 07:00' },
    { Slotid: 8, Slotname: '07:00 - 08:00' },
    { Slotid: 9, Slotname: '08:00 - 09:00' },
    { Slotid: 10, Slotname: '09:00 - 10:00' },
    { Slotid: 11, Slotname: '10:00 - 11:00' },
    { Slotid: 12, Slotname: '11:00 - 12:00' },
    { Slotid: 13, Slotname: '12:00 - 13:00' },
    { Slotid: 14, Slotname: '13:00 - 14:00' },
    { Slotid: 15, Slotname: '14:00 - 15:00' },
    { Slotid: 16, Slotname: '15:00 - 16:00' },
    { Slotid: 17, Slotname: '16:00 - 17:00' },
    { Slotid: 18, Slotname: '17:00 - 18:00' },
    { Slotid: 19, Slotname: '18:00 - 19:00' },
    { Slotid: 20, Slotname: '19:00 - 20:00' },
    { Slotid: 21, Slotname: '20:00 - 21:00' },
    { Slotid: 22, Slotname: '21:00 - 22:00' },
    { Slotid: 23, Slotname: '22:00 - 23:00' },
    { Slotid: 24, Slotname: '23:00 - 24:00' },
  ]

  constructor(private router: Router,private slotService: SlotservService) {
    this.slotService.GetSlots()
      .subscribe(data => {
        for (let t in data) {
          this.available.push(!data[t].bavailable);
          this.booked.push(data[t].bavailable);
        }
      })
    console.log(this.booked);
  }
  public onButtonClick(val: any): void {
    this.TotalBill+=1500;
    this.booked[val] = false;
    this.available[val] = true;

    this.curbookedslot = {slotI:val,SlotName:this.slotname[val].Slotname}
    this.bookedslot.push(this.curbookedslot);
    this.bookedslotId.push(val + 1);
    // console.log(this.booked);
    // console.log(this.available);
  }
  bookselectedslot() {

    if (this.bookedslotId.length < 1) {
      alert("Plase Select Atleast One Slot")
    }
    else {
      // console.log(this.bookedslotId)
      this.slotService.Bookslots(this.bookedslotId,localStorage.getItem('UId'))
        .subscribe(data => {

        })
    }
  }
  logOut(){
  this.router.navigate(['/login']);
  }
  DeleteThisSlot(value:any){
    this.TotalBill -= 1500;

    this.booked[value] = true;
    this.available[value] = false;
    for(let t in this.bookedslotId){
      if(this.bookedslot[t].slotI == value){
        this.bookedslot = this.bookedslot.filter(item => item.slotI !== value);
      }

      if(this.bookedslotId[t] == value+1){

        this.bookedslotId.splice(this.bookedslotId.indexOf(value+1),1);
      }           
    }

  }

}
