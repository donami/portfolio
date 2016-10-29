import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PortfolioAppComponent } from '../app/portfolio.component';

beforeEachProviders(() => [PortfolioAppComponent]);

describe('App: Portfolio', () => {
  it('should create the app',
      inject([PortfolioAppComponent], (app: PortfolioAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'portfolio works!\'',
      inject([PortfolioAppComponent], (app: PortfolioAppComponent) => {
    expect(app.title).toEqual('portfolio works!');
  }));
});
