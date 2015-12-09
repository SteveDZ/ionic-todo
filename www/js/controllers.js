angular.module('todo.controllers', [])

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Projects, $cordovaCamera, $ionicPlatform) {
    //var todoController = this;

    $scope.tasks = [];

    $ionicModal.fromTemplateUrl('new-project.html', function(modal){
        $scope.projectModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });
    
    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
        $scope.taskModal = modal;
    },{
        scope: $scope,
        animation: 'slide-in-up'
    });

    var createProject = function(projectTitle) {
        var newProject = Projects.newProject(projectTitle);
        $scope.projects.push(newProject);
        Projects.save($scope.projects);
        $scope.selectProject(newProject, $scope.projects.length -1);
    };

    $scope.projects = Projects.all();
    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    $scope.newProject = function() {
        $scope.projectModal.show();
    };
    
    $scope.closeNewProject = function() {
        $scope.projectModal.hide();
    }

    $scope.selectProject = function(project, index) {
        $scope.activeProject = project;
        Projects.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    $scope.createProject = function(project) {
        createProject(project.title);
        
        $scope.projectModal.hide();
        project.title = "";
    };

    $scope.createTask = function(task){
        if(!$scope.activeProject || !task) {
            return;
        }

        $scope.activeProject.tasks.push({
            title: task.title
        });

        $scope.taskModal.hide();
        task.title = "";

        Projects.save($scope.projects);
    };

    $scope.newTask = function() {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    };

    $scope.toggleProjects = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    
    $scope.takePicture = function() {
        var options = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 340,
            targetHeight: 340,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        
        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // error
            });
        });
    }
});
