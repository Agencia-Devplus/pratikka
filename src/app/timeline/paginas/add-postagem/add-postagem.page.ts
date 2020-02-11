import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-add-postagem',
  templateUrl: './add-postagem.page.html',
  styleUrls: ['./add-postagem.page.scss'],
})
export class AddPostagemPage implements OnInit {

  postagens: any;
  postagemTitulo: string;
  postagemTexto: number;
  postagemCapa: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
  }

  lerPostagens(){
    this.crudService.read_Postagens().subscribe(data => {
 
      this.postagens = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.postagens);
 
    });
  }

  criarPostagem(){
    let record = {};
    record['Titulo'] = this.postagemTitulo;
    record['Texto'] = this.postagemTexto;
    record['Capa'] = this.postagemCapa;
    this.crudService.create_NovaPostagem(record).then(resp => {
      this.postagemTitulo = "";
      this.postagemTexto = undefined;
      this.postagemCapa = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Postagem(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditTitulo = record.Titulo;
    record.EditTexto = record.Texto;
    record.EditCapa = record.Capa;
  }

}
