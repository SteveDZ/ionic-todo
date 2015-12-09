describe('TodoCtrl', function() {
	var controller,
		ProjectsService,
		mockScope,
		ionicSideMenuDelegate,
		projectModal;
		//ionicModal;
		
	beforeEach(module('todo'));
	beforeEach(inject(function($controller, $rootScope) {
		mockScope = $rootScope.$new();
		
		ProjectsService = {
			newProject: jasmine.createSpy('newProject spy').and.returnValue({
            	title: 'title',
            	tasks: []
            }),
			save: jasmine.createSpy('save spy'),
			all: jasmine.createSpy('all spy').and.returnValue([]),
			getLastActiveIndex: jasmine.createSpy('getLastActiveIndex spy').and.returnValue(1),
			setLastActiveIndex: jasmine.createSpy('setLastActiveIndex spy')
		};
		
		ionicSideMenuDelegate = {
			toggleLeft: jasmine.createSpy('toggleLeft spy')
		};
		
		projectModal = {
			show: jasmine.createSpy('show spy'),
			hide: jasmine.createSpy('hide spy')
		}
		
		mockScope.projectModal = projectModal;
		mockScope.projects = [];
		
		controller = $controller('TodoCtrl', {
			$scope: mockScope,
			Projects: ProjectsService,
			$ionicSideMenuDelegate: ionicSideMenuDelegate
		});
	}));
	
	describe('TodoCtrl#contstructor', function() {
		it('should call all on Projects service', function() {
			expect(ProjectsService.all).toHaveBeenCalled();
		});
	});
		
	describe('TodoCtrl#newProject', function() {
		it('should show projectModal', function() {
			mockScope.newProject();
			
			expect(projectModal.show);
		});
	});
	
	describe('TodoCtrl#closeNewProject', function() {
		it('should hide projectModal', function() {
			mockScope.closeNewProject();
			
			expect(projectModal.hide)
		});
	});
		
	describe('TodoCtrl#selectProject', function() {
		it('should call save on Projects service', function() {
			var project = {}, index = 1;
			mockScope.selectProject(project, index);
			
			expect(mockScope.activeProject).toEqual(project);
			expect(ProjectsService.setLastActiveIndex).toHaveBeenCalledWith(index);
			expect(ionicSideMenuDelegate.toggleLeft).toHaveBeenCalledWith(false);
		});
	});
	
	describe('TodoCtrl#createProject', function() {
		var project = {title: 'mockTitle'};
		
		it('should call createProject helper method', function() {			
			mockScope.createProject(project);
			
			expect(ProjectsService.newProject).toHaveBeenCalledWith('mockTitle');
			//expect(mockScope.projects.push).toHaveBeenCalledWith({title:'title', tasks:[]})
			expect(ProjectsService.save).toHaveBeenCalledWith(mockScope.projects);
			//expect(mockScope.selectProject).toHaveBeenCalled();			
			
		});
		
		it('should hide projectModal', function() {
			mockScope.createProject(project);
			
			expect(mockScope.projectModal.hide).toHaveBeenCalled();
			expect(project.title).toEqual('');
		});
	});
	
});