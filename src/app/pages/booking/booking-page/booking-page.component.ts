import { Component, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as RecordRTC from 'recordrtc';
import { buffer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
})
export class BookingPageComponent {
  base_url = environment.aws_url;
  panelOpenState1 = true;
  panelOpenState2 = false;
  panelOpenState3 = false;
  title = 'audio-record';
  record: any;
  recording = false;
  url: any;
  error: any;
  package_id: any;
  package_data: any;
  package_items: any;
  pickup_address: any;
  drop_address: any;
  pickup_options: any;
  pickup_addressId = 0;
  drop_addressId = 0;
  total_distance: any;
  isChecked = true;
  bookingDate: any;
  timeslots: any;
  booking_slot: any;
  stripe: any;
  clientSecret: any;
  elements: any;
  mediaRecorder: any;
  chunks: any[] = [];
  custId: any;
  custName: any;
  customerVehicleList: any;
  customerVehicleId: any;
  brand: any;
  model: any;
  variant: any;
  year: any;
  subpackages: any;
  services: any;
  tot_package_price: any;
  tot_package_vat: any;
  selectedPickupOption: any;
  pickup_cost: any;
  pickup_vat: any;
  gs_isvat: any;
  gs_vat: any;
  vehicle_groupid: any;
  labour_rate: any;
  comments: any;
  pack_extra: any;
  coupon_id: any;
  gs_ispayment: any;
  discount: any;
  pickup_name: any;
  subpackage: any;
  servicesFromBackend: any;
  sparesFromBackend: any;
  decodedServiceId: any;
  serviceId: any;
  custBookingList: any;
  numberOfDaysfrmBackend: any;
  minSelectableDate: any;
  maxSelectableDate: any;
  constructor(
    private domSanitizer: DomSanitizer,
    private router: Router,
    private activerouter: ActivatedRoute,
    private booking_service: BookingService,
    private auth_service: AuthService,
    private toast: ToastrService
  ) {
    this.timeslots = [];
    this.booking_slot = 0;
    this.getCustomerAddresses();
    this.getpickupOptions();
    this.package_id = this.activerouter.snapshot.paramMap.get('id');
    //this.package_id =  atob(this.package_id);
    this.booking_service
      .GetpackagebyId(this.package_id)
      .subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.package_data = rdata.packages;
          this.subpackages = rdata.services;
          this.services = rdata.services;
          this.pack_extra = rdata.pack_extra_details;
          console.log('package data---------->>>', this.package_data);
          this.package_items = [];
          rdata.services.forEach((element: { ser_display_name: any }) => {
            this.package_items.push({ serviceName: element.ser_display_name });
          });
          rdata.spares.forEach((element: { spc_displayname: any }) => {
            this.package_items.push({ serviceName: element.spc_displayname });
          });
          rdata.subpackages.forEach((eachsub: { operations: any[] }) => {
            eachsub.operations.forEach((eachop) => {
              this.package_items.push({ serviceName: eachop.op_display_name });
            });
          });
          console.log('package items------>', this.package_items);
        }
      });
  }
  ngOnInit(): void {
    this.invokeStripe();
    this.custId = localStorage.getItem('id');
    this.customerVehicleId = 0;
    this.getCustomerVehicleList();
    this.getCustomerBookings();
    // this.getBookingDetails();
  }

  // getBookingDetails() {
  //   this.booking_service.getbookingDetails().subscribe((data) => {
  //     this.numberOfDaysfrmBackend = Number(data.settings.gs_nofdays);
  //     console.log(
  //       'The number of Days from Backend: ' + this.numberOfDaysfrmBackend
  //     );
  //     this.calculateTheSelectedDates();
  //   });
  // }

  getCustomerVehicleList() {
    this.auth_service
      .customerVehicleList({ custId: atob(this.custId) })
      .subscribe((fetched_data) => {
        this.customerVehicleList = fetched_data.vehList;
      });
  }

  calculateTheSelectedDates() {
    const currentDate = new Date();
    this.minSelectableDate = currentDate;
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + this.numberOfDaysfrmBackend);
    this.maxSelectableDate = maxDate;
    console.log(
      'The selected dates',
      this.minSelectableDate,
      this.maxSelectableDate
    );
  }

  getTimeslots() {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(url);
  }

  startRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  successCallback(stream: MediaStream) {
    const options: RecordRTC.Options = {
      mimeType: 'audio/wav',
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  processRecording(blob: Blob | MediaSource) {
    this.url = URL.createObjectURL(blob);
  }
  deleteAudio() {
    this.url = null;
    this.recording = false;
  }
  errorCallback(error: any) {
    this.error = 'Cant play audio in your browser';
  }
  getCustomerAddresses() {
    this.booking_service
      .GetcustomerAddresses({ cust_id: localStorage.getItem('id') })
      .subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.pickup_address = rdata.cust_address;
          this.drop_address = rdata.cust_address;
          console.log('----------drop adresses----->', this.drop_address);
        }
      });
  }
  onSelectionChange(event: any) {
    // Do something when the selection changes
    let pickup_distance = this.pickup_address.find(
      (address: { cad_id: string }) =>
        address.cad_id === this.pickup_addressId.toString()
    ).cad_distance;
    if (this.isChecked) {
      this.total_distance = parseFloat(pickup_distance) * 2;
      this.drop_addressId = this.pickup_addressId;
    } else if (this.drop_addressId != 0) {
      let drop_distance = this.drop_address.find(
        (address: { cad_id: string }) =>
          address.cad_id === this.drop_addressId.toString()
      ).cad_distance;
      this.total_distance =
        parseFloat(pickup_distance) + parseFloat(drop_distance);
    } else {
      this.total_distance = 0;
    }
    this.getpickupOptions();
  }

  getpickupOptions() {
    this.booking_service.getpickupOptions().subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        if (this.total_distance != 0) {
          rdata.active_pickuptype_list.forEach(
            (element: {
              pk_freeFlag: any;
              cost: any;
              vat: any;
              pk_cost: any;
            }) => {
              console.log(
                '----------drop element.pk_freeFlag----->',
                element.pk_freeFlag
              );
              if (element.pk_freeFlag !== '1') {
                element.cost =
                  parseFloat(element.pk_cost) * parseFloat(this.total_distance);
                if (this.gs_vat)
                  element.vat =
                    parseFloat(element.cost) * parseFloat(this.gs_vat);
                else element.vat = 0;
              } else {
                element.cost = 0;
              }
            }
          );
        }
        this.pickup_options = rdata.active_pickuptype_list;

        console.log(
          '----------pickup pickup_options----->',
          this.pickup_options
        );
      }
    });
  }

  ondateSelection() {
    this.timeslots = [];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[this.bookingDate.getDay()]; // This will return "Saturday"
    const day = ('0' + this.bookingDate.getDate()).slice(-2);
    const month = ('0' + (this.bookingDate.getMonth() + 1)).slice(-2);
    const year = this.bookingDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    let inputData = {
      day: dayName,
      date: formattedDate,
    };
    this.booking_service
      .gettimeslotsbyDate(inputData)
      .subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          const currentTime = new Date();
          let bufferTime = parseInt(rdata.settings.gs_bookingbuffer_time);

          console.log('Buffer Time: ' + bufferTime);

          // Create a new Date object for the buffer time
          const bufferDate = new Date(currentTime);
          bufferDate.setMinutes(bufferDate.getMinutes() + bufferTime);

          console.log(
            'Before buffer time addition: ' + currentTime.getMinutes()
          );

          console.log('After buffer time addition: ' + bufferDate.getMinutes());

          // Continue with your logic using the updated date

          rdata.time_slots.forEach((data: any, index: any) => {
            let time = data.tm_start_time;
            const [hoursStr, minutesStr] = time.split(':');
            const targetHours = parseInt(hoursStr);
            const targetMinutes = parseInt(minutesStr);

            // Convert target time to minutes since midnight for comparison
            const targetTimeInMinutes = targetHours * 60 + targetMinutes;

            // Convert buffer time to minutes since midnight for comparison
            const bufferTimeInMinutes =
              bufferDate.getHours() * 60 + bufferDate.getMinutes();

            // Compare the target time with the buffer time
            if (targetTimeInMinutes > bufferTimeInMinutes) {
              let startTime = data.tm_start_time;
              let endTime = data.tm_end_time;

              // Convert start time to 12-hour format
              let startDate = new Date('2000-01-01 ' + startTime);
              let startTime12hr = startDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

              // Convert end time to 12-hour format
              let endDate = new Date('2000-01-01 ' + endTime);
              let endTime12hr = endDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

              let timeData = { startTime: startTime12hr, endTime: endTime12hr };

              this.timeslots.push(timeData);
            }
          });

         console.log(this.timeslots);
          
        }
      });
  }
  preparePayment(id: any) {
    // const data: IPreparePyamentRequest = { via: 'stripe' };
    // this.paymentService.preparePayment(data, id).subscribe((res: { [x: string]: any; }) => {
    //   this.clientSecret = res['client_secret'];
    //   this.initialize();
    // });
  }
  async initialize() {
    let emailAddress = '';
    const clientSecret = this.clientSecret;
    const appearance = {
      theme: 'stripe',
    };
    this.elements = this.stripe.elements({ appearance, clientSecret });
    const linkAuthenticationElement =
      this.elements.create('linkAuthentication');
    linkAuthenticationElement.mount('#link-authentication-element');
    linkAuthenticationElement.on(
      'change',
      (event: { value: { email: string } }) => {
        emailAddress = event.value.email;
      }
    );
    const paymentElementOptions = {
      layout: 'tabs',
    };
    const paymentElement = this.elements.create(
      'payment',
      paymentElementOptions
    );
    paymentElement.mount('#payment-element');
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (<any>window).Stripe(environment.stripe.publicKey);
      };
      window.document.body.appendChild(script);
    }
  }
  openPickupsection(type: any) {
    if (type == 0) {
      this.panelOpenState1 = false;
      this.panelOpenState2 = true;
      this.panelOpenState3 = false;
    } else {
      this.panelOpenState1 = false;
      this.panelOpenState2 = false;
      this.panelOpenState3 = true;
    }
  }
  PickupOptionSelection(eachpickup: any) {
    this.pickup_name = eachpickup.pk_name;
    this.pickup_vat = eachpickup.vat;
    this.pickup_cost = eachpickup.cost;
  }
  createBooking() {
    this.panelOpenState1 = false;
    this.panelOpenState2 = false;
    this.panelOpenState3 = true;
    this.custId = localStorage.getItem('id');
    this.custName = localStorage.getItem('name');
    let bookingData = {
      bookingattachment: this.url,
      custId: atob(this.custId),
      cust_name: atob(this.custName),
      vehId: this.customerVehicleId,
      brand: this.brand,
      model: this.model,
      variant: this.variant,
      bkurl: '',
      pickupaddress: this.pickup_addressId,
      dropaddress: this.drop_addressId,
      bookingdate: this.bookingDate,
      operationlabourrate: 5,
      sub_packages: this.subpackages,
      services: this.services,
      expenses: [],
      packid: this.package_id,
      packtype: this.package_data.pkg_type,
      packprice: this.tot_package_price,
      pack_vat: this.tot_package_vat,
      pickup_vat: this.pickup_vat,
      gs_vat: this.gs_vat,
      veh_groupid: this.vehicle_groupid,
      vgm_labour_rate: this.labour_rate,
      total_amount: this.tot_package_price,
      advance: '0',
      discount: this.discount ? this.discount : '0',
      bk_branchid: 1,
      complaint: this.comments,
      slot: this.booking_slot,
      pickuptype: this.selectedPickupOption,
      sourcetype: 'WEB',
      pack_extra_details: this.pack_extra,
      bk_pickup_cost: (
        parseFloat(this.pickup_cost) - parseFloat(this.pickup_vat)
      ).toFixed(2),
      coupon_id: this.coupon_id != 0 ? this.coupon_id : null,
      gs_ispayment: this.gs_ispayment,
    };
    this.booking_service.create_booking(bookingData).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        this.router.navigateByUrl(
          'booking-status-flow/' + btoa(rdata.booking_id)
        );
      }
    });
  }

  onvehicleSelectionChange(custvehId: any) {
    if (custvehId) {
      let filterdArray = this.custBookingList.filter((data: any) => {
        return custvehId == data.bk_vehicle_id;
      });

      if (
        (filterdArray.length > 0 &&
          filterdArray[0].custstatus != 'Delivery Completed') ||
        (filterdArray.length > 0 &&
          filterdArray[0].custstatus != 'Booking Canceled')
      ) {
        this.toast.error('Booking already exists');
        return; // Exit the function if booking exists
      }
    }
    if (custvehId) {
      let filterdVehicleData = this.customerVehicleList.filter(
        (customerVehicleList: any) => {
          return (customerVehicleList = customerVehicleList.cv_id == custvehId);
        }
      );
      this.brand = filterdVehicleData[0].cv_make;
      this.model = filterdVehicleData[0].cv_model;
      this.variant = filterdVehicleData[0].cv_variant;
      this.year = filterdVehicleData[0].cv_year;
      let data = {
        brand: this.brand,
        model: this.model,
        variant: this.variant == null ? '' : this.variant,
        year: this.year,
        package: atob(this.package_id),
      };
      this.booking_service
        .getVehiclePackageInfo(data)
        .subscribe((rdata: any) => {
          if (rdata.ret_data == 'success') {
            this.tot_package_price = 0.0;
            this.vehicle_groupid = rdata.veh_group.vgm_id;
            this.labour_rate = rdata.veh_group.vgm_labour_rate;
            this.gs_ispayment = rdata.settings.gs_ispayment;
            this.subpackage = rdata.sub_packages;
            this.servicesFromBackend = rdata.services;
            this.sparesFromBackend = rdata.spares;
            if (this.subpackage && this.servicesFromBackend) {
              let filterdData: any[] = [];
              this.subpackage.forEach((data: any) => {
                data.operations.forEach((operation: any) => {
                  if (
                    operation.opvm_pack_timeunit == null ||
                    operation.opvm_billexclusion == null
                  ) {
                    filterdData.push(operation);
                  }
                });
                data.spares.forEach((spares: any) => {
                  if (spares.spares_used == null) {
                    filterdData.push(spares);
                  }
                });
              });
              this.servicesFromBackend.forEach((service: any) => {
                if (service.sevm_cost == 0) {
                  filterdData.push(service);
                }
              });
              if (filterdData.length > 0) {
                this.toast.error(
                  'Sorry, currently we cannot service this model'
                );
              }
              console.log('This is Something Else', filterdData);
              filterdData = [];
              return;
            }
            rdata.services.forEach((element: any) => {
              if (element.pse_billexclusion == '0') {
                if (element.sevm_cost != '' && element.sevm_cost != null) {
                  if (rdata.settings.gs_isvat == '1' && rdata.settings.gs_vat)
                    element.sevm_vat = (
                      (parseFloat(element.sevm_cost) *
                        parseFloat(rdata.settings.gs_vat)) /
                      100
                    ).toFixed(2);
                  else element.sevm_vat = 0.0;
                  element.sevm_price = (
                    parseFloat(element.sevm_cost) + parseFloat(element.sevm_vat)
                  ).toFixed(2);
                  element.tot_cost = parseFloat(element.sevm_cost).toFixed(2);
                  this.tot_package_price =
                    this.tot_package_price + parseFloat(element.sevm_cost);
                } else {
                  element.tot_cost = 0.0;
                  element.sevm_cost = 0.0;
                  element.sevm_vat = 0.0;
                  element.sevm_price = 0.0;
                }
              } else {
                element.tot_cost =
                  element.sevm_cost != null ? 'cost excluded flag false' : 0.0;
                element.sevm_cost = 0.0;
                element.sevm_vat = 0.0;
                element.sevm_price = 0.0;
              }
            });
            rdata.sub_packages.forEach((element: any) => {
              let pack_cost = 0;
              element.operations.forEach((element2: any) => {
                if (
                  element2.opvm_billexclusion == '0' &&
                  element2.spo_billexclusion == '0'
                ) {
                  if (
                    element2.opvm_pack_timeunit != null &&
                    element2.opvm_pack_timeunit != ''
                  ) {
                    element2.op_cost = (
                      parseFloat(rdata.veh_group.vgm_labour_rate) *
                      parseFloat(element2.opvm_pack_timeunit)
                    ).toFixed(2);
                    if (rdata.settings.gs_isvat == '1' && rdata.settings.gs_vat)
                      element2.op_vat = (
                        (parseFloat(element2.op_cost) *
                          parseFloat(rdata.settings.gs_vat)) /
                        100
                      ).toFixed(2);
                    else element2.op_vat = 0.0;
                    element2.op_total = (
                      parseFloat(element2.op_cost) + parseFloat(element2.op_vat)
                    ).toFixed(2);
                    pack_cost =
                      pack_cost +
                      parseFloat(rdata.veh_group.vgm_labour_rate) *
                        parseFloat(element2.opvm_pack_timeunit);
                  } else {
                    element2.op_cost = 0.0;
                    element2.op_vat = 0.0;
                    element2.op_total = 0.0;
                  }
                } else {
                  element2.op_cost =
                    element2.opvm_pack_timeunit != null
                      ? 'cost excluded flag false'
                      : '0.00';
                  element2.op_vat =
                    element2.opvm_pack_timeunit != null
                      ? 'cost excluded flag false'
                      : '0.00';
                  element2.op_total =
                    element2.opvm_pack_timeunit != null
                      ? 'cost excluded flag false'
                      : '0.00';
                }
              });
              element.spares.forEach((element3: any) => {
                let spare_cost = 0;
                if (element3.spp_billexclusion == '0') {
                  element3.spares_used.forEach((element4: any) => {
                    if (
                      element4.scvm_price != '' &&
                      element4.scvm_price != null
                    ) {
                      spare_cost =
                        spare_cost +
                        parseFloat(element4.scvm_price) *
                          parseFloat(element4.scvm_quantity);
                    }
                  });
                  element3.sp_price = spare_cost.toFixed(2);
                  element3.sp_vat = (
                    (parseFloat(element3.sp_price) *
                      parseFloat(rdata.settings.gs_vat)) /
                    100
                  ).toFixed(2);
                  element3.sp_cost = (
                    parseFloat(element3.sp_price) + parseFloat(element3.sp_vat)
                  ).toFixed(2);
                  pack_cost = pack_cost + spare_cost;
                } else {
                  element3.sp_price = 'cost excluded flag false';
                  element3.sp_vat = 'cost excluded flag false';
                  element3.sp_cost = 'cost excluded flag false';
                }
              });
              element.pack_cost = pack_cost.toFixed(2);
              this.tot_package_price = this.tot_package_price + pack_cost;
            });
            rdata.pack_extra_details.forEach((element4: any) => {
              if (element4.pe_cost != null && element4.pe_cost != '') {
                this.tot_package_price =
                  this.tot_package_price + parseFloat(element4.pe_cost);
                element4.pe_price = element4.pe_cost;
                element4.pe_vat = (
                  (parseFloat(element4.pe_cost) *
                    parseFloat(rdata.settings.gs_vat)) /
                  100
                ).toFixed(2);
                element4.pe_cost =
                  parseFloat(element4.pe_cost) +
                  (parseFloat(element4.pe_cost) *
                    parseFloat(rdata.settings.gs_vat)) /
                    100;
                element4.pe_cost = element4.pe_cost.toFixed(2);
              } else {
                element4.pe_price = 0.0;
                element4.pe_vat = 0.0;
                element4.pe_cost = 0.0;
              }
            });
            // if(rdata.pack_factor&&rdata.pack_factor.pvg_factor){
            //   this.tot_package_price = Math.round(this.tot_package_price * parseFloat(rdata.pack_factor.pvg_factor));
            // }

            if (rdata.settings.gs_isvat == '1' && rdata.settings.gs_vat) {
              this.tot_package_vat =
                (this.tot_package_price * parseFloat(rdata.settings.gs_vat)) /
                100;
            }

            // this.detailedPackage = {
            //   "labourrate": rdata.veh_group.vgm_labour_rate,
            //   "veh_group": rdata.veh_group.vgm_code,
            //   // "group_start_year": rdata.veh_group.vgroup_start_year,
            //   // "group_end_year": rdata.veh_group.vgroup_end_year,
            //   "group_id": rdata.veh_group.vgm_id,
            //   "subpackages": rdata.sub_packages,
            //   "services": rdata.services,
            //   "extracharges":rdata.pack_extra_details,
            //   "service_vehgroup":rdata.service_veh_group,
            //   "gs_vat":rdata.settings.gs_vat
            // }
            this.tot_package_price = Math.round(this.tot_package_price);
          }
        });
    } else {
    }
  }
  closeAddressModal() {
    const modalDiv = document.getElementById('addressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }
  openAddressModal() {
    const modalDiv = document.getElementById('addressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  getCustomerBookings() {
    let data = {
      custId: atob(this.custId),
    };
    this.booking_service.getCustomerBookings(data).subscribe((data) => {
      this.custBookingList = data.book_list;
    });
  }
}
