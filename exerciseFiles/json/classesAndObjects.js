// class User{

//     constructor(Fname, Lname, credits){
//         this.Fname = Fname;
//         this.Lname = Lname;
//         this.credits = credits;
//        // console.log(this.Fname + " : " +this.Lname + " : "  + this.credits );
//     }
//     getFullName(){
//         // let fullName =  ` ${this.Fname} ${this.Lname}`;
//         // return fullName;
//         return ` ${this.Fname} ${this.Lname}` ;
//     }

//     editName(newName){
//          const myName  =  newName.split(' '); // returns seperated but in array
//          this.Fname = myName[0];
//          this.Lname = myName[1];
//     }
//     getMiddleName(newBigName){

//         const myName  =  newBigName.split(' '); // returns seperted but in array
//          this.Fname = myName[0];
//          this.Mname = myName[1];
//          this.Lname = myName[2];
//          console.log(` ${this.Fname} ${this.Mname} ${this.Lname}`);
//     }
// }

// class Teacher extends User{

//      constructor(Fname, Lname, credits, subject){
//          super(Fname, Lname, credits);
//          this.subject = subject;
//      }
//      getFullName(){
//         return ` ${this.Fname} ${this.Lname} is my full name and i teach ${this.subject}` ;
//      }
// }




// const John = new User("John", "Doe", 34);
// const Sam = new User("Sammer", "Khurana", 46);

// // console.log(John.getFullName());
// // console.log(Sam.getFullName());
// // John.editName("Johnny Doer");
// // console.log(John.getFullName());
// // John.getMiddleName("Johny Deepu Doer");


//  const Sir = new Teacher("nishtha", "Singh" , 39, "Hindi");
// //const Sir = new Teacher("nishtha", "Singh" , 39);
// console.log(Sir.getFullName());



// function deposit(...money){
//     console.log(money);
//     let balance = 0;
//     for(let i=0; i<money.length; i++){
//         balance += money[i];
//     }
//     return balance ;
// }
// console.log(deposit(100,23,35,100,45));


// let addMoney = [23,234,45,23,12,6,90]; 
// // console.log(Math.max(addMoney));  => will not work

// console.log(Math.max(...addMoney));  // => now it works

// console.log(...addMoney);


import {score, cardfees} from "./script.js";

console.log(score);
cardfees();

