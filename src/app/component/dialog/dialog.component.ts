import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{

freshnessList=["Brand New","Second Hand","Refurbished"]

productForm!:FormGroup;
actionBtn:string="save";

  constructor(private formBuilder : FormBuilder , private api:ApiService,@Inject(MAT_DIALOG_DATA) public editData : any ,private dialogRef : MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]
    });

      if(this.editData){
        this.actionBtn= "Update";
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['category'].setValue(this.editData.productName);
        this.productForm.controls['freshness'].setValue(this.editData.productName);
        this.productForm.controls['price'].setValue(this.editData.productName);
        this.productForm.controls['comment'].setValue(this.editData.productName);
        this.productForm.controls['date'].setValue(this.editData.productName);
      }
  }

  addProduct(){
    // console.log(this.productForm.value)
      if(!this.editData){
        if(this.productForm.valid){
          this.api.postProduct(this.productForm.value)
          .subscribe({
            next:(res)=>{
              alert("Product added succesfully");
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the product")
            }
          })
        }
      }
      else{
        this.updateProduct()
      }
    
  }

  updateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated Succesfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record");
        }
      })
  }
}
