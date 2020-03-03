import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  user: firebase.User;
  idpostagem: string
  postagem: any;

  constructor(private crudService: CrudService, public route: ActivatedRoute, private auth: AuthService) {
    this.auth.authState$.subscribe(user => (this.user = user));
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idpostagem = params.get('id')
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
