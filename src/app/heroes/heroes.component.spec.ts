import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj(['getHeros', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of());
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toEqual(2);
      expect(component.heroes).not.toContain(HEROES[2]);
    });
  });
});
