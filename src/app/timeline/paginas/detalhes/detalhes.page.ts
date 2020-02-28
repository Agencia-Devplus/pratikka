import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  
  idpostagem:string
  postagem: any;

  constructor(private crudService: CrudService, public route:ActivatedRoute) {

    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        this.idpostagem=params.get('id')

      })
   }

  ngOnInit() {
    this.getPostagem(this.idpostagem);
  }

  getPostagem(recordRow) {
    this.crudService.detail_Postagem(this.idpostagem).subscribe(data => {

      this.postagem = data.data();
      //convertendo objeto em array
      this.postagem = Array.of(this.postagem);
      
      
      console.log(this.postagem);
    })
  }

}
