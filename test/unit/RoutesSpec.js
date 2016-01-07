'use strict';

var expect = chai.expect;

describe('Routes', function() {
  var $route;

  beforeEach(module('conemoAppApp'));

  beforeEach(inject(function(_$route_) {
    $route = _$route_;
  }));

  it('wires /', function() {
    expect($route.routes['/'].controller).to.eq('MainCtrl');
  });

  it('wires /configuration', function() {
    expect($route.routes['/configuration'].controller).to.eq('ConfigurationController');
  });

  it('wires /lesson/:id', function() {
    expect($route.routes['/lesson/:id'].controller).to.eq('LessonCtrl');
  });

  it('wires /toolbox', function() {
    expect($route.routes['/toolbox'].controller).to.eq('ToolboxCtrl');
  });

  it('wires /contact', function() {
    expect($route.routes['/contact'].controller).to.eq('ContactCtrl');
  });

  it('wires /contact/:type', function() {
    expect($route.routes['/contact/:type'].controller).to.eq('ContactCtrl');
  });

  it('wires /instructions', function() {
    expect($route.routes['/instructions'].controller).to.eq('InstructionsCtrl');
  });

  it('wires /instructions/:key', function() {
    expect($route.routes['/instructions/:key'].controller)
      .to.eq('InstructionsCtrl');
  });

  it('wires /sample_lesson', function() {
    expect($route.routes['/sample_lesson'].controller)
      .to.eq('SampleLessonController');
  });

  describe('when no authentication token is present', function() {
    it('redirects to the configuration controller', function() {
      expect($route.current).to.be.undefined;
    });
  });
});
