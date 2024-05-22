import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
ngOnInit(): void {
this.getEmployee()
}
employeeObject : Employee = new Employee();
EmployeeList : Employee[] = []
@ViewChild('mymodal') modal : ElementRef | undefined;
departments : any = [
  'Angular Developer' ,'Senior Java developer' ,'Charted Accountant' ,'System Engineer'
]

modalOpen(){
 if(this.modal != null){
  this.modal.nativeElement.style.display = 'contents'
 }
}
closeModal(){
  if(this.modal != null){
    this.modal.nativeElement.style.display = 'none'
   }
   this.employeeObject = new Employee()
}
onSubmit(){
  const localData = localStorage.getItem('angularLocalEmployeeData');
  if(localData != null){
    const localarray = JSON.parse(localData);
    this.employeeObject.id = localarray.length +1;
    localarray.push(this.employeeObject);
    localStorage.setItem('angularLocalEmployeeData', JSON.stringify(localarray))
  }else{
    const newArray = [];
    this.employeeObject.id=1;
    newArray.push(this.employeeObject);
    localStorage.setItem('angularLocalEmployeeData', JSON.stringify(newArray))
  }
  this.getEmployee()
  this.employeeObject = new Employee()
  this.closeModal()
}

getEmployee(){
  const localData = localStorage.getItem('angularLocalEmployeeData');
  if(localData !=null){
    this.EmployeeList = JSON.parse(localData)
  }
}

onDelete(){
const currentIndex = this.EmployeeList.findIndex(e => e.id === this.employeeObject.id)
const deleteConfirm = confirm('Are you sure to delete record?')
if(deleteConfirm){
  this.EmployeeList.splice(currentIndex , 1)

}
localStorage.setItem('angularLocalEmployeeData', JSON.stringify(this.EmployeeList))
this.closeModal()
}

onEdit(emp: Employee){
  
  this.employeeObject = emp
  this.modalOpen()
}

onUpdate(){
  let currentObject = this.EmployeeList.find(e => e.id == this.employeeObject.id)
  if(currentObject != undefined){
    currentObject = this.employeeObject
  
  }
  localStorage.setItem('angularLocalEmployeeData', JSON.stringify(this.EmployeeList))
  this.closeModal()
}
}
