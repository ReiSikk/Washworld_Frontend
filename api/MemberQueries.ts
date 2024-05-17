import { SuperQueries } from "./SuperQueries";
import { createMemberDTO } from "../entities/CreateMemberDTO";

export class MemberQueries extends SuperQueries {
    static baseUrl = SuperQueries.baseUrl + 'auth/'

/*     static async login( email: string, password: string) {
console.log("calling...", this.baseUrl + "login");

       const response = await fetch(this.baseUrl + "login", { 
          method: 'POST',
           headers: {
               'Content-Type': 'application/json'
            },
           body: JSON.stringify({ email, password, firstName, lastName, phone, active, joinDate, loyaltyPoints})
       });
        const data = await response.json();
       console.log(data, "data from login response");
        
        return data;
    } */
 static async signup(member: createMemberDTO) {
    console.log('calling signup)')
         const response = await fetch(this.baseUrl + "signup", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
         });
         const data = response.json();

         return data;  
         }
         
    static async logout() {
        console.log("Not implemented yet");
    } 
}