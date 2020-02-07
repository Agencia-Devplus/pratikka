import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostagensPage } from './postagens.page';

describe('PostagensPage', () => {
  let component: PostagensPage;
  let fixture: ComponentFixture<PostagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
