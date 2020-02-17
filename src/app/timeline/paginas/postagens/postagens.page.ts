import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.page.html',
  styleUrls: ['./postagens.page.scss'],
})
export class PostagensPage implements OnInit {

  postagens: any;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.lerPostagens();
  }

  lerPostagens(){
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

  RemoveRecord(rowID) {
    this.crudService.delete_Postagem(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.editTitulo = record.Titulo;
    record.editTexto = record.Texto;
    record.editCapa = record.Capa;
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['Titulo'] = recordRow.editTitulo;
    record['Texto'] = recordRow.editTexto;
    record['Capa'] = recordRow.editCapa;
    this.crudService.update_Postagem(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
