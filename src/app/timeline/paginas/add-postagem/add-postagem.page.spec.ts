import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPostagemPage } from './add-postagem.page';

describe('AddPostagemPage', () => {
  let component: AddPostagemPage;
  let fixture: ComponentFixture<AddPostagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
