import { Component, ViewChild,ElementRef, OnInit } from '@angular/core';
import { FormdataService } from '../formdata.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

interface ApiResponse {

    Table: any[];
  }
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  isEditMode: boolean = false;
  originalData: any = {};
  hoveredRowIndex: number | null = null;

  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('taxInput') taxInputRef!: ElementRef;

  res: any;
  data: any;
  tableData: any[] = [];

  constructor(private api: FormdataService) {}
  
  ngOnInit() {
    this.fetchAndDisplayData();
  }

  setHoveredRow(index: number | null) {
    this.hoveredRowIndex = index;
  }

  formobj: {
    TaxID: number;
    Name: string;
    Rate: number;
    Inactive: boolean;
    api_key: string;
  } = {
    TaxID: 0,
      Name: '',
      Rate: 0,
      Inactive: false,
      api_key: 'glowsis.database.windows.net@C521@OEG0AOOVFWRNP61POWXF4UMRGB06VD8LDO665LKEG9MZ69OURT@72788@9HtoYeF4gS8Ya2h3373NgMX7xD3373r33743373d9UVxf3z4jE8eA4KVtpXXCsPX90i3374RqH9eJAJOIavVeG8YpY=',
    };


  onSubmit() {
  
    // console.log(formobj)
      const { Name, TaxID, Rate, Inactive, api_key } = this.formobj;
      const inactiveString= Inactive ? 'Y':'N';
      console.log('Inactive',inactiveString);

      
      if (this.isEditMode) {

        if (!this.formobj.Name) {
          alert('name should not be empty');
          return(this.formobj.Name = this.originalData.Name);
        }
       

        console.log("hi",this.originalData)
        const originalTaxID = this.originalData.TaxID;

        const updatedData = {
          Name,
          Rate: +this.formobj.Rate,
          Inactive:inactiveString,
        };
        // console.log
        console.log("hi",)
       
        this.api.updateData(originalTaxID, updatedData, api_key).subscribe(
          (res) => {
            // alert("hi")
            console.log("hi",res);
          console.log('Data updated successfully', res);
          this.resetForm();
          this.isEditMode = false;
          this.fetchAndDisplayData();
         });
        
      } 
      
     
      else {
      
        this.api.submitData(TaxID, Name, Rate, inactiveString, api_key).subscribe(
        (res)=>{
          console.log(res);
          console.log('form submitted successfully',res);
         this.resetForm();
         this.fetchAndDisplayData();
      });

    
    }
      
  }
     
    private  fetchAndDisplayData(){
        let localVariable:any;
        this.api.fetchData(this.formobj.api_key).subscribe({
                    next: (res: any) => {
                      console.log('API data retrieved', res);
                       localVariable = res;
                      this.tableData = localVariable.data.Table;
          
                      console.log('table data', this.tableData);
                    },
          error: (error) => {
            console.error('Error fetching data from API', error); 
          }
                  });
        }


      private resetForm() {
        this.formobj = {
          TaxID: 0,
          Name: '',
          Rate: 0,
          Inactive: false,
          api_key: ''
        };
      }

      editRow(selectedItem: any) {
        // Set the form values with the data from the selected row
        this.originalData = { ...selectedItem };
        this.formobj = {
          TaxID: selectedItem.TaxID,
          Name: selectedItem.Name,
          Rate: selectedItem.Rate,
          Inactive: selectedItem.Inactive === 'Y',
        
          api_key: this.formobj.api_key,
        };
        
        this.nameInputRef.nativeElement.focus();

        this.isEditMode = true;

        this.taxInputRef.nativeElement.readOnly = true;

        

      }
      }


