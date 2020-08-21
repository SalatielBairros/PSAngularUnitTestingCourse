import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/internal/observable/of";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("HeroesComponent {class test}", () => {
  let component: HeroesComponent;
  let mockHeroService;
  let heroes;

  beforeEach(() => {
    heroes = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from heroes array", () => {
      //arrange
      component.heroes = heroes;
      mockHeroService.deleteHero.and.returnValue(of(true));

      //act
      component.delete(heroes[2]);

      //assert
      expect(component.heroes.length).toBe(2);
    });

    it("should call deleteHero", () => {
      //arrange
      component.heroes = heroes;
      mockHeroService.deleteHero.and.returnValue(of(true));

      //act
      component.delete(heroes[2]);

      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });
  });
});

describe("HeroesComponent {shallow test}", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroService;
  let heroes;

  @Component({
    selector: "app-hero",
    template: "<div></div>",
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    heroes = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
      //schemas: [NO_ERRORS_SCHEMA],
    });

    // ngOnInit é chamado toda a vez que o componente for criado.
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("shoult set heroes correctly from the service", () => {
    expect(component.heroes.length).toBe(3);
  });

  it("should have all heros on DOM", () => {
    const liCount = fixture.debugElement.queryAll(By.css("ul.heroes li"))
      .length;

    expect(liCount).toBe(3);
  });
});
