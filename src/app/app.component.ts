import { Component,ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskUi';
  public files:any=[];
  public file_id='';
  public code_written='';
  @ViewChild('writtenCode',{static:false}) writtenCode: ElementRef;

  constructor(private http:HttpClient){
    this.getList();
  }

  public getList(){
    this.http.get('http://127.0.0.1:5000/get_code').subscribe(
      response=>{
        console.log(response)
        this.files=response['list'];
        console.log(this.files)

        
      }
    );
  }

  public displayCode(code,id){
    this.file_id=id;
    this.writtenCode.nativeElement.innerHTML=code;
    this.code_written=code;
  }

  onSubmit(){
    let data={
      'code':this.writtenCode.nativeElement.innerHTML
    }
    this.code_written=this.writtenCode.nativeElement.innerHTML
    this.http.post('http://127.0.0.1:5000/save_code',data).subscribe(
          response=>{
            console.log(response)
            if(response['response']=='1'){
              this.files.push(response['message']);
              this.file_id=response['message'];
            }
            
          }
        );
       
  }
  onReset(){
    this.writtenCode.nativeElement.innerHTML=this.code_written;
  }

  onRemove(id){
  
    this.http.get('http://127.0.0.1:5000/remove_code/'+id).subscribe(
          response=>{
            console.log(response)
            if(response['response']=='1'){
              let ind=this.files.indexOf(this.file_id)
              this.file_id='';
              this.getList();
              this.code_written='';
            }

            
          }
        );
       
  }
}
