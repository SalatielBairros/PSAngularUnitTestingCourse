import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs/internal/observable/of";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent", () => {
  let mockActivateRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockActivateRoute = {
      snapshot: {
        paramMap: {
          get: () => "3",
        },
      },
    };

    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);

    TestBed.configureTestingModule({
      // forms module quando utilizar ngModel
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 100 })
    );

    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();
  });

  it("should render hero name in a h2 tag", () => {
    const h2Content = fixture.nativeElement.querySelector("h2").textContent;
    expect(h2Content).toContain("SUPERDUDE");
  });
});
