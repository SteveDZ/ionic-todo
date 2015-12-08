describe('TodoCtrl', function() {
	var controller,
		ProjectsService,
		mockScope;
		
	beforeEach(module('todo'));
	beforeEach(inject(function($controller, $rootScope) {
		mockScope = $rootScope.$new;
		
		ProjectsService = {
			newProject: jasmine.createSpy('newProject spy').and.returnValue({
            	title: 'title',
            	tasks: []
            }),
			save: jasmine.createSpy('save spy'),
			all: jasmine.createSpy('all spy').and.returnValue([]),
			getLastActiveIndex: jasmine.createSpy('getLastActiveIndex spy').and.returnValue(1)
		}
		
		controller = $controller('TodoCtrl', {
			$scope: mockScope,
			Projects: ProjectsService
		});
	}));
	
	describe('TodoCtrl#contstructor', function() {
		it('should call all on Projects service', function() {
			expect(ProjectsService.all).toHaveBeenCalled();
		})
	});
		
	describe('#selectProject', function() {
		
		var project = {}, index = 1;
		controller.selectProject(project, index);
		
		it('should call save on Projects service', function() {
			
		});
	});
});