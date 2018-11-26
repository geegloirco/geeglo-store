import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {MapService} from "../../../service/map-service/map.service";
import {LatLng, latLng} from "leaflet";
import {AddressService} from "../../../service/address/address.service";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";
import {RootContainerService} from "../../root/root-container/root-container.component";

@Component({
  selector: 'user-address-view',
  templateUrl: './user-address-view.component.html',
  styleUrls: ['./user-address-view.component.css']
})
export class UserAddressViewComponent implements OnInit {
  addresses = null;
  addressSelectedMap = {};
  selectedOriginal = null;
  selectedLocation = {};
  isSmall = false;

  @Input() name: string = "default";
  @Output() addressSelected = new EventEmitter<object>();

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
    public resizeService: RootContainerService,
    private loadWaitService: LoadWaitService,
    public addressService: AddressService,
    public mapService: MapService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.resizeService.afterResize().subscribe(res => {
      this.isSmall = res['isSmall'];
    });

    this.loadWaitService.wait();
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
          this.loadWaitService.release();
        }, err => {
          this.loadWaitService.release();
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
      this.mapService.setMarker(this.name, latLng(this.selected['latitude'], this.selected['longitude']));
      this.addressSelected.emit(this.selected);
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
      this.addressSelected.emit(null);

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
        this.mapService.reset(this.name);
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
    if(!this.mapService.getMarker(this.name)) {
      this.messageService.add("موقعیت روی نقشه انتخاب شود");
    } else if(this.addressSelectedMap[0]) {
      this.loadWaitService.wait();
      this.selected['latitude'] = this.mapService.getMarker(this.name).lat;
      this.selected['longitude'] = this.mapService.getMarker(this.name).lng;
      this.personalityService.registerAddress(this.selected).subscribe(res => {
        // console.log(res);
        this.addresses.push(res);
        this.addressSelectedMap[res['id']] = false;
        this.toggleAddressCollapseMap(res);
        this.messageService.add("موفق");
        this.loadWaitService.release();
      }, err => {
        // console.log(err);
        this.messageService.add("نا موفق");
        this.loadWaitService.release();
      });
    } else {
      this.selected['latitude'] = this.mapService.getMarker(this.name).lat;
      this.selected['longitude'] = this.mapService.getMarker(this.name).lng;
      if(JSON.stringify(this.selectedOriginal) === JSON.stringify(this.selected)) {
        // console.log('no change');
      } else {
        this.personalityService.updateAddress(this.selected).subscribe(res => {
          console.log(res);
          let index = this.addresses.indexOf(this.selectedOriginal);
          this.addresses[index] = res;
          this.loadWaitService.release();
        }, err => {
          console.log(err);
          this.loadWaitService.release();
        });
      }
    }
  }

  removeAddress() {
    this.loadWaitService.wait();
    this.personalityService.removeAddress(this.selected.id).subscribe(res => {
      // console.log(res);
      let index = this.addresses.indexOf(this.selectedOriginal);
      this.addresses.splice(index, 1);
      delete this.addressSelectedMap[this.selected.id];
      // console.log(this.selectedLocation);
      this.selected = null;
      this.selectedOriginal = null;
      this.createNewAddress();
      this.loadWaitService.release();
    }, err => {
      console.log(err);
      this.loadWaitService.release();
    });
  }

  addressRevert() {
    this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
    this.mapService.setMarker(this.name, latLng(this.selected['latitude'], this.selected['longitude']));
  }

  addressChangeCancel() {
    this.mapService.reset(this.name);
    this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
  }
}
