import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  slidesOptions = {
    slidesPerView: 3
  };

  postagens: any;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.lerPostagens();
  }

  lerPostagens() {
    this.crudService.read_Postagens().subscribe(data => {

      this.postagens = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Titulo: e.payload.doc.data()['Titulo'],
          Texto: e.payload.doc.data()['Texto'],
          Capa: e.payload.doc.data()['Capa'],
        };
      })
      console.log(this.postagens);

    });
  }

}
