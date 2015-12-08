describe('TodoCtrl', function() {
	var controller,
		Projects;
		
	describe('#newProject', function() {
		
		//var projectTitle = 'projectTitle';
		//controller.save(projectTitle);
		
		it('should call save on Projects service', function() {
			expect(Projects.newProject).toHaveBeenCalledWith(projectTitle);
			expect(Projects.save).toHaveBeenCalledWith(controller.projects);
		})
	})
});