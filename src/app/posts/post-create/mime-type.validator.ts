// This is to make a validator to check if the file uploaded is actually an image
// error null = valid

import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

// 1) exporting a function because validators are functions
// 2) it is a arrow function
export const mimeType = (
  // 3- asynchronous task.... because you need an event to start it up eg uploading the file,
  // thus you are required to use promise or observable, which are generic meaning can set the return type
  // 4- {[key:string]:any} means any type of value that is type string, key means anything
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if(typeof(control.value)==='string'){
    return of(null);
  }
  // 5-telling it that it is a file
  const file = control.value as File;
  // 6- use file reader to read the file from the control
  const fileReader = new FileReader();
  // 7- to create an observable since its needed to be returned
  // 8- has an Observer passed in...
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      //9 - listen to loadend event
      fileReader.addEventListener("loadend", () => {
        // 11 - from file that was just converted into an array ...
        // converting the new array that can be used to parse mimetype
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          //converting the string to hexidecimal
          header += arr[i].toString(16);
        }
        // 12- finding the header for the string eg finding if its png jpeg .doc etc
        switch (header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        // 13 using observer to emit null if valid, if it is wrong then emit anything else true or false
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        // 14 let subscribers know done
        observer.complete();
      });
      // 10 - reads in the file as an array buffer which trigger 9)
      fileReader.readAsArrayBuffer(file);
    }
  );
  // 15- returning null or false...
  return frObs;

};
