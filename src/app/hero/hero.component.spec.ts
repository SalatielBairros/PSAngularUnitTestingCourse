import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent {shallow tests}", () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      /*  Devemos apenas utilizar este schema quando extremamente necessário,
          pois ele pode esconder erros. */
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it("should have the correct hero", () => {
    component.hero = { id: 1, name: "SuperDude", strength: 3 };
    expect(component.hero.name).toEqual("SuperDude");
  });

  it("should render hero name in the anchor tag", () => {
    // arrange
    component.hero = { id: 1, name: "SuperDude", strength: 3 };
    fixture.detectChanges();

    //act
    const ne_anchorText = fixture.nativeElement.querySelector("a").textContent;
    const de_anchorText = fixture.debugElement.query(By.css("a")).nativeElement
      .textContent;

    //assert
    expect(ne_anchorText).toContain("SuperDude");
    expect(de_anchorText).toContain("SuperDude");

    /*  Debug element usa o HTML do angular, com suas funções, listeners e outros.
        Já o nativeelement lida com o HTML efetivamente gerado.
        Em geral é recomendado utilizar o debugElement para o Angular. */
  });
});
