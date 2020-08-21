import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });
  });

  describe("GetHero", () => {
    it("should call with correct URL", inject(
      [HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe();
        // define o que esperar
        const req = controller.expectOne({
          method: "GET",
          url: "api/heroes/4",
        });
        //define o retorno
        req.flush({ id: 4, name: "SuperDude", strength: 100 });
        //verifica se o esperado foi exatamente o que aconeceu
        controller.verify();
      }
    ));
  });
});
