import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown, gender: any): unknown {
   if(gender == "Male"){
    return 'Mr. '+ value 
   }else{
    return 'Miss ' + value 
   }
  }

}
