console.log('app.js');

var app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
    this.message = "angular works!";
    this.sports = [];
    this.events = [];
    var controller = this;


    this.getSports = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports'
        }).then(function(result){
            console.log(result);
            controller.sports = result.data;
        });
    };

    this.getEvents = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/events'
        }).then(function(result){
            console.log(result);
            controller.events = result.data
        });
    };
    this.getSports();
    this.getEvents();

    this.addEvent = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/events',
            data: this.createformdata
        }).then(function(result){
            controller.createformdata = {};
            controller.events.unshift(result.data)
        });
    };

    this.editEvent = function() {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/events/',
            data: this.editformdata
        }).then(function(result){
            controller.editformdata = {};
            controller
        })
    };

    this.removeEvent = function() {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/events',
            data: this.deletedata
        }).then(function(result){
            console.log(result);
        });
    };



}]);
