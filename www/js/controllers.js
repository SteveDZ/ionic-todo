angular.module('todo.controllers', [])

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Projects) {
    var todoController = this;

    todoController.tasks = [];

    var createProject = function(projectTitle) {
        var newProject = Projects.newProject(projectTitle);
        todoController.projects.push(newProject);
        Projects.save(todoController.projects);
        todoController.selectProject(newProject, todoController.projects.length -1);
    };
    todoController.projects = Projects.all();
    todoController.activeProject = todoController.projects[Projects.getLastActiveIndex()];

    todoController.newProject = function() {
        var projectTitle = prompt('Project name');
        if(projectTitle) {
            createProject(projectTitle);
        }
    };

    todoController.selectProject = function(project, index) {
        todoController.activeProject = project;
        Projects.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
        todoController.taskModal = modal;
    },{
        scope: $scope,
        animation: 'slide-in-up'
    });

    todoController.createTask = function(task){
        if(!todoController.activeProject || !task) {
            return;
        }

        todoController.activeProject.tasks.push({
            title: task.title
        });

        todoController.taskModal.hide();
        task.title = "";

        Projects.save(todoController.projects);
    };

    todoController.newTask = function() {
        todoController.taskModal.show();
    };

    todoController.closeNewTask = function() {
        todoController.taskModal.hide();
    };

    todoController.toggleProjects = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $timeout(function() {
        if(todoController.projects.length == 0) {
            while(true) {
                var projectTitle = prompt('Your first project title:');

                if(projectTitle) {
                    createProject(projectTitle);
                    break;
                }
            }
        }
    });
});
