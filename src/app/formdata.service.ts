import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {


  constructor(private http: HttpClient) { }
//method for making http get requests
  submitData(TaxID: number, Name: string, Rate: number, Inactive: string , api_key: string) {
  // alert('formsubmitted');
   
    let url = `https://login.glowsis.com/erppro/masters/taxcode/save`;
    
  

    let params = new HttpParams()
      .set('TaxID', TaxID.toString())
      .set('Name', Name)
      .set('Rate', Rate.toString())
      .set('Inactive', Inactive)
     
      .set('api_key', `glowsis.database.windows.net@C521@E6L0VNJ8LGLPO9MDAC9OP4DOTVUHXDIPZ9Q0ZR0WQNDCN3MBAR@72727@P24K6AA4nw7E4Pfz0ewN13CXYd7U2pMpxBAwNG3373cSC9xNlOvUzY4lrI3373AZSsmMIT83373yyUFljFG0=
`)
 return this.http.get(url, { params: params });
  }
  fetchData(api_key: string){
        // alert('successfully find')
         let url1 = `https://login.glowsis.com/erppro/masters/taxcode/find`;
    
        let params = new HttpParams()
        .set('api_key', `glowsis.database.windows.net@C521@E6L0VNJ8LGLPO9MDAC9OP4DOTVUHXDIPZ9Q0ZR0WQNDCN3MBAR@72727@P24K6AA4nw7E4Pfz0ewN13CXYd7U2pMpxBAwNG3373cSC9xNlOvUzY4lrI3373AZSsmMIT83373yyUFljFG0=`);
    
        return this.http.get(url1, {params: params});
      }
   
      updateData(taxID: number, updatedData: any, api_key: string) {
        // alert("Sucess");
        console.log(updatedData);
        let url = `https://login.glowsis.com/erppro/masters/taxcode/save`;
      
        console.log('Original TaxID:', updatedData.Name);
        
        let params = new HttpParams()
          .set('TaxID', taxID)
          .set('Name', updatedData.Name)
      .set('Rate', updatedData.Rate)
      .set('Inactive', updatedData.Inactive)
          .set('api_key',`glowsis.database.windows.net@C521@E6L0VNJ8LGLPO9MDAC9OP4DOTVUHXDIPZ9Q0ZR0WQNDCN3MBAR@72727@P24K6AA4nw7E4Pfz0ewN13CXYd7U2pMpxBAwNG3373cSC9xNlOvUzY4lrI3373AZSsmMIT83373yyUFljFG0=
          `);
      
        return this.http.get(url, { params: params });
      }

}




 

