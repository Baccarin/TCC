

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NotesService } from './notes.service';


declare var window: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any;
  data: any;
  filter: any ;
  formModal: any;
  p: number = 1;

  constructor(private _notesservice: NotesService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal'),
    );

    this.init();
  }

  init() {
    this.reset();
    this._notesservice.getAll().subscribe(resp => {
      //console.log(resp)
      this.notes = resp.results
    })
  }

  reset(): void {
    this.data = {
      vacancy: '',
      vacancy_description: ''
    }
  }

  onSubmit(data: any) {
   // console.log(data)
    this._notesservice.insertNote(data).subscribe(resp => {
      //console.log(resp);
      if (resp != undefined) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Saved successfully!',
          showConfirmButton: false,
          timer: 3500
        })
        this.init();
        this.formModal.hide();
      }
    })
  }

  edit(id: any) {
    this.formModal.show();
    this._notesservice.getNote(id).subscribe(resp => {
      //console.log(resp.results[0].id)
      this.data = resp.results[0]
    })
  }

  del(id: any, note: any) {
    //console.log(userId)
    Swal.fire({
      title: "Warning!",
      text: `Do you really want to delete "${note}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Yes, is it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._notesservice.delNote(id).subscribe(resp => {
          //console.log(resp)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully deleted!',
            showConfirmButton: false,
            timer: 3500
          })
          this.init();
        })
      }
    })
  }

  closeModal() {
    window.location.reload();
  }
  openModal() {
    this.formModal.show();
    this.init();
  }


}



