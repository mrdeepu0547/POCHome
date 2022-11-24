import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PsServiceService } from '../ps-service.service';
class psUser {
  "psId":number;
  "salutationId":string;
  "genderId": string;
  "lastName":string;
  "firstName": string;
  "raceId":string;
  "maritalStatusID": string;
  "dob":string;
  "ssn": string;
  "languageId":string;
  "locationId": string;
  "city": string;
  "addressType":string;
  "addressLine":string;
  "addressLine2": string;
  "zipcode": string;
  "phoneTypeid": string;
  "phone": string;
  "stateId": number;
  "countyId": number;
  "timeZoneId": number;
  "countryId": string;
  "officeId": number;
  "mappedOfficeIds": string;
  "updatedUserId": number;
}
@Component({
  selector: 'app-ps-home',
  templateUrl: './ps-home.component.html',
  styleUrls: ['./ps-home.component.css']
})
export class PsHomeComponent implements OnInit {

  public lowerBound:number = 0;
  pageSize: number = 20;
   paseSizes:number[] = [5, 10, 15, 20];
  public lookUpsData:any = [];
  public psList:any = [];
  public upperBound:number=this.pageSize;
  users= psUser;
  tempData= psUser;
  public show = false;
  public searchText = '';
  public viewtable = false
  public submitted = false;
  public lastName=''
  public firstName=''
  public names=[]
  public editForm=false;
  personForm = new FormGroup({
    psId:new FormControl(0),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required]),
    salutation: new FormControl('', [Validators.required]),
    maritialStatus: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    language: new FormControl(null, [Validators.required]),
    addressType: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    addressLine2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneType:new FormControl('',[Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    timeZone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

public data = {
  "psId": 0,
  "salutationId":'Mr',
  "genderId": "U",
  "lastName": "1-louisville",
  "firstName": " l",
  "raceId": "O",
  "maritalStatusID": "U",
  "dob": "01/01/1998",
  "ssn": "",
  "languageId": 1,
  "locationId": "",
  "city": "Antioch",
  "addressType":"",
  "addressLine": "5-10/1/1/10/N/P",
  "addressLine2": "",
  "zipcode": "37011",
  "phoneTypeid": "Home",
  "phone": "7896325410",
  "stateId": 43,
  "countyId": 751,
  "timeZoneId": 1,
  "countryId": "USA",
  "officeId": 140,
  "mappedOfficeIds": "140",
  "updatedUserId": 1 //hard code
}


 constructor(private psService: PsServiceService , private http:HttpClient) { }

 ngOnInit() {
  this.getAllPersons();
  this.getAllLookupsData();
  this.tempData=this.psList
 }
 ngOnChanges(){
  this.setPageSize()
 }
 get getControl(){
  return this.personForm.controls;
 }

 onClickedMe(){
  this.viewtable=true;
 }

 onClicked(){
  this.show=true;
 }

 onClose(){
  this.viewtable=false;
 }

 onSubmit() {
   this.submitted = true;
   if(this.personForm.invalid){
     return
    }
    else{
      this.setValue();
    this.psService.addPersons(this.data)
    }
    alert("Sucess !!");
    this.setValue();
    console.log(this.data);

    this.personForm.reset();
    this.show=false
  }

 onCancel(){
   this.personForm.reset();
   this.show=false;
   this.editForm=false
 }

 getAllPersons() {
  let jsonObj={"userId":1,"lowerBound":this.lowerBound,"upperBound":this.pageSize,"psId":0,"psName":"","officeId":0,"ssn":0,"mrn":0,"city":"","stateId":"","zipCode":"","phone":"","psStatusId":"1","admissionStartDate":"","admissionEndDate":"","dischargeDate":"","caseManagerId":0,"coordinatorId":0,"serviceStartDate":"","serviceEndDate":"","serviceId":0,"authNumber":"","payorPlanId":"","authStatusId":"","accountNumber":"","dischargeStartDate":"","dischargeEndDate":""};
    this.psService.getPersons(JSON.stringify(jsonObj)).subscribe(result => {
      this.psList = result.psList;
      console.log(result);
    })
  }

 setValue() {
    this.data.psId=this.personForm.get('psId')?.value;
    this.data.lastName=this.personForm.get('lastName')?.value;
    this.data.firstName=this.personForm.get('firstName')?.value;
    this.data.phoneTypeid=this.personForm.get('phoneType')?.value;
    this.data.languageId=this.personForm.get('language')?.value;
    this.data.maritalStatusID=this.personForm.get('maritialStatus')?.value;
    this.data.genderId=this.personForm.get('gender')?.value;
    this.data.salutationId=this.personForm.get('salutation')?.value;
    this.data.raceId=this.personForm.get('race')?.value;
    this.data.ssn=this.personForm.get('ssn')?.value;
    this.data.phone=this.personForm.get('phone')?.value;
    this.data.zipcode=this.personForm.get('zipCode')?.value;
    this.data.addressType=this.personForm.get('addressType')?.value,
    this.data.addressLine=this.personForm.get('addressLine1')?.value;
    this.data.addressLine2=this.personForm.get('addressLine2')?.value;
    this.data.dob="01/01/1998"
  }
userData:any=[]
  onEditForm(data,i) {
    this.show=true;
    this.editForm=true
    console.log(this.psList[i]); console.log(data.PSName);
    console.log(i);
    console.log(data.PSId)
    this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSDetails?jsonObj={"psId":'+data.PSId+'}').subscribe(
      result => {
        this.userData = result;
        console.log(result);
        this.personForm.patchValue({
          lastName: this.userData.lastname,
          firstName: this.userData.firstname,
          gender: this.userData.gender,
          salutation: this.userData.salutation,
          maritialStatus: this.userData.maritialStatus,
          dateOfBirth: this.userData.dob,
          race: this.userData.race,
          ssn: this.userData.ssn,
          language: this.psList[i].language,
          addressType: this.psList[i].addressType,
          addressLine1: this.userData.addressLane1,
          addressLine2: this.psList[i].addressLine2,
          zipCode: this.userData.zipCode,
          phoneType: this.userData.phoneType,
          phone: this.userData.phone1,
          city: this.userData.city,
          state: this.userData.state,
          timeZone: this.userData.timeZone,
          country: this.userData.countryId,
          psId:this.userData.PSId
        });
      })
      console.log(this.userData)
    const name =data.PSName;
    this.names=name.split(",")

    console.log(this.userData)
  }

//get look ups data
  getAllLookupsData() {
   this.psService.getData().subscribe(result => {
     this.lookUpsData = result;
     console.log(result);
   })
 }
//functions for next calls and previeous calls
 onPrevious(){
  console.log(this.pageSize)
   this.lowerBound=this.lowerBound-Number(this.pageSize)
   this.upperBound=this.upperBound-Number(this.pageSize)
   console.log(this.lowerBound)
   console.log(this.upperBound)
   let jsonObj={"userId":1,"lowerBound":this.lowerBound,"upperBound":this.upperBound,"psId":0,"psName":"","officeId":0,"ssn":0,"mrn":0,"city":"","stateId":"","zipCode":"","phone":"","psStatusId":"1","admissionStartDate":"","admissionEndDate":"","dischargeDate":"","caseManagerId":0,"coordinatorId":0,"serviceStartDate":"","serviceEndDate":"","serviceId":0,"authNumber":"","payorPlanId":"","authStatusId":"","accountNumber":"","dischargeStartDate":"","dischargeEndDate":""};
   this.psService.getPersons(JSON.stringify(jsonObj)).subscribe(result => {
     this.psList = result.psList;
     console.log(result);
   })
 }

 onNext(){
  console.log(this.pageSize)
   this.lowerBound=this.lowerBound+Number(this.pageSize)
   this.upperBound=this.upperBound+Number(this.pageSize);
   console.log(this.lowerBound)
   console.log(this.upperBound);
   let jsonObj={"userId":1,"lowerBound":this.lowerBound+1,"upperBound":this.upperBound,"psId":0,"psName":"","officeId":0,"ssn":0,"mrn":0,"city":"","stateId":"","zipCode":"","phone":"","psStatusId":"1","admissionStartDate":"","admissionEndDate":"","dischargeDate":"","caseManagerId":0,"coordinatorId":0,"serviceStartDate":"","serviceEndDate":"","serviceId":0,"authNumber":"","payorPlanId":"","authStatusId":"","accountNumber":"","dischargeStartDate":"","dischargeEndDate":""};
   this.psService.getPersons(JSON.stringify(jsonObj)).subscribe(result => {
    this.psList = result.psList;
    console.log(result);
  })
  //  this.getAllPersons();
 }
//page limiters

setPageSize = () => {
  console.log( this.pageSize);
  // this.lowerBound+=Number(this.pageSize)
  this.upperBound=this.lowerBound+Number(this.pageSize)
  console.log(this.lowerBound)
  console.log(this.upperBound)
  let jsonObj={"userId":1,"lowerBound":this.lowerBound+1,"upperBound":this.upperBound,"psId":0,"psName":"","officeId":0,"ssn":0,"mrn":0,"city":"","stateId":"","zipCode":"","phone":"","psStatusId":"1","admissionStartDate":"","admissionEndDate":"","dischargeDate":"","caseManagerId":0,"coordinatorId":0,"serviceStartDate":"","serviceEndDate":"","serviceId":0,"authNumber":"","payorPlanId":"","authStatusId":"","accountNumber":"","dischargeStartDate":"","dischargeEndDate":""};
  this.psService.getPersons(JSON.stringify(jsonObj)).subscribe(result => {
    this.psList = result.psList;
    console.log(result);
  })
};
}

