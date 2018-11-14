import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {MapService} from "../../../service/map-service/map.service";
import {LatLng, latLng} from "leaflet";
import {AddressService} from "../../../service/address/address.service";

@Component({
  selector: 'user-address-view',
  templateUrl: './user-address-view.component.html',
  styleUrls: ['./user-address-view.component.css']
})
export class UserAddressViewComponent implements OnInit {
  loadWaited = false;

  addresses = null;
  addressSelectedMap = {};
  selectedOriginal = null;
  selectedLocation = {};

  @Output() addressSelected = new EventEmitter<boolean>();

  selected = {
    id: 0,
    title: '',
    detail: '',
    phoneNumber: '',
    postCode: '',
    location: LatLng
  };

  constructor(
    public personalityService: PersonalityService,
    public addressService: AddressService,
    public mapService: MapService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadWaited = true;
    this.personalityService.afterLoggedIn().subscribe(res => {
      if(res === LoginStatus.login)
        this.addressService.getAddresses().subscribe(res => {
          this.addresses = res;
          if(!this.addresses) {
            this.addresses = [];
          }
          this.addressSelectedMap = {};
          for(let a of this.addresses) {
            this.addressSelectedMap[a['id']] = false;
          }
          this.addressSelectedMap[0] = false;
          this.createNewAddress();
          this.loadWaited = false;
        }, err => {
          this.loadWaited = false;
        })
    });
  }

  toggleAddressCollapseMap(address) {
    let lastState = this.addressSelectedMap[address['id']];
    for (let key in this.addressSelectedMap) {
      this.addressSelectedMap[key] = false;
    }
    this.addressSelectedMap[address['id']] = !lastState;
    console.log(this.addressSelectedMap[address['id']])

    if(this.addressSelectedMap[address['id']]) {
      this.selectedOriginal = address;
      this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
      this.mapService.setDefaultMarker(latLng(this.selected['latitude'], this.selected['longitude']));
      this.addressSelected.emit(true);
    } else {
      this.createNewAddress();
      // this.addressSelected.emit(false);
      // this.selectedOriginal = null;
      // this.selected = null;
    }
  }

  createNewAddress() {
    if(!this.addressSelectedMap[0]) {
      let lastState = this.addressSelectedMap[0];
      for (let key in this.addressSelectedMap) {
        this.addressSelectedMap[key] = false;
      }
      this.addressSelectedMap[0] = !lastState;
      this.addressSelected.emit(false);

      if(this.addressSelectedMap[0]) {
        this.selectedOriginal = {
          'id': 0,
          'title': '',
          'detail': '',
          'phoneNumber': '',
          'postCode': '',
          'longitude': null,
          'latitude': null,
        }
        this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
        this.mapService.defaultReset();
        // if(this.map) {
        //   this.zone.run(() => {
        //       setTimeout(() => {this.map.invalidateSize(true); console.log("invalidate")}, 1000);
        //   });
        // }
      } else {
        this.selectedOriginal = null;
        this.selected = null;
      }
    }
  }

  addressChangeOk() {
    if(!this.mapService.getMarker()) {
      this.messageService.add("موقعیت روی نقشه انتخاب شود");
    } else if(this.addressSelectedMap[0]) {
      this.loadWaited = true;
      this.selected['latitude'] = this.mapService.getMarker().lat;
      this.selected['longitude'] = this.mapService.getMarker().lng;
      this.personalityService.registerAddress(this.selected).subscribe(res => {
        // console.log(res);
        this.addresses.push(res);
        this.addressSelectedMap[res['id']] = false;
        this.toggleAddressCollapseMap(res);
        this.messageService.add("موفق");
        this.loadWaited = false;
      }, err => {
        // console.log(err);
        this.messageService.add("نا موفق");
        this.loadWaited = false;
      });
    } else {
      this.selected['latitude'] = this.mapService.getMarker().lat;
      this.selected['longitude'] = this.mapService.getMarker().lng;
      if(JSON.stringify(this.selectedOriginal) === JSON.stringify(this.selected)) {
        // console.log('no change');
      } else {
        this.personalityService.updateAddress(this.selected).subscribe(res => {
          console.log(res);
          let index = this.addresses.indexOf(this.selectedOriginal);
          this.addresses[index] = res;
          this.loadWaited = false;
        }, err => {
          console.log(err);
          this.loadWaited = false;
        });
      }
    }
  }

  removeAddress() {
    this.personalityService.removeAddress(this.selected.id).subscribe(res => {
      // console.log(res);
      let index = this.addresses.indexOf(this.selectedOriginal);
      this.addresses.splice(index, 1);
      delete this.addressSelectedMap[this.selected.id];
      // console.log(this.selectedLocation);
      this.selected = null;
      this.selectedOriginal = null;
      this.createNewAddress();
      this.loadWaited = false;
    }, err => {
      console.log(err);
      this.loadWaited = false;
    });
  }

  addressRevert() {
    this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
    this.mapService.setDefaultMarker(latLng(this.selected['latitude'], this.selected['longitude']));
  }

  addressChangeCancel() {
    this.mapService.defaultReset();
    this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
  }
}
