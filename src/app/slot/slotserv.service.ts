import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { slotforbooking } from './slotmodel';

@Injectable({
  providedIn: 'root'
})
export class SlotservService {
  readonly rootUrl = 'https://localhost:44385/api/Slot/';
  constructor(private http: HttpClient) { }

  GetSlots() {
    return this.http.get(this.rootUrl + 'GetSlots');
  }

  Bookslots(slotsId:number[],uId:string|null){
    const body: slotforbooking = {
      slotIDs: slotsId,
      userId:uId
    }
    return this.http.post(this.rootUrl + 'BookSlots', body);

  }
}
