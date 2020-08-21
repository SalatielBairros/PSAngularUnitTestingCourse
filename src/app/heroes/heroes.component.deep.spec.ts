import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick" },
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe("HeroesComponent {deep test}", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  beforeAll(() => {
    TestBed.resetTestingModule();
  });

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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
    });

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture = TestBed.createComponent(HeroesComponent);
    // run ngOnInit
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have all heroes", () => {
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it("should render each hero as a HeroComponent", () => {
    const heroComponents = fixture.debugElement.queryAll(By.css("app-hero"));
    expect(heroComponents.length).toBe(3);
  });

  it("should have correct hero", () => {
    const hComponent = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    )[0];
    const heroName = hComponent.componentInstance.hero.name;
    expect(heroName).toEqual(heroes[0].name);
  });

  describe("DOM Interaction - Delete Hero", () => {
    it("should call heroService.deleteHero when the Hero Components delete button is clicked", () => {
      const heroComponents = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      spyOn(fixture.componentInstance, "delete");

      heroComponents[0]
        .query(By.css("button"))
        .triggerEventHandler("click", { stopPropagation: () => {} });

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });

    it("should call heroService.deleteHero when the Hero Components delete indirectly", () => {
      const heroComponents = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      spyOn(fixture.componentInstance, "delete");

      (<HeroComponent>heroComponents[0].componentInstance).delete.emit(
        undefined
      );

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });

    it("should call heroService.deleteHero when the Hero Components delete directly", () => {
      const heroComponents = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      spyOn(fixture.componentInstance, "delete");

      heroComponents[0].triggerEventHandler("delete", null);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });
  });

  describe("DOM interaction - Add Hero", () => {
    it("should add a new hero to the hero list when the add button is clicked", () => {
      const name = "Mr. Ice";
      mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));
      const inputElement = fixture.debugElement.query(By.css("input"))
        .nativeElement;
      const addButton = fixture.debugElement.query(By.css("div button"));
      inputElement.value = name;

      addButton.triggerEventHandler("click", null);
      fixture.detectChanges();
      const heroesText = fixture.debugElement.query(By.css("ul")).nativeElement
        .textContent;

      expect(heroesText).toContain(name);
    });
  });

  // it("should have the correct rout for selected hero", () => {
  //   const heroComponents = fixture.debugElement.queryAll(
  //     By.directive(HeroComponent)
  //   );
  //   const routerLink = heroComponents[0]
  //     .query(By.directive(RouterLinkDirectiveStub))
  //     .injector.get(RouterLinkDirectiveStub);

  //   heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

  //   expect(routerLink.navigatedTo).toBe('/detail/1');
  // });
});
