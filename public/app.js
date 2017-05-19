console.log('app.js');

var app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
    this.message = "angular works!";
    this.sports = [];
    this.events = [];
    this.eventSearchFilterSports = {};
    this.eventSearchFilterGenders = {};
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

    // get events for specific sport
    this.getEvents = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports/1/events'
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
            url: 'http://localhost:3000/sports/1/events',
            data: this.createformdata
        }).then(function(result){
            controller.createformdata = {};
            controller.events.unshift(result.data)
        });
    };

    this.editEvent = function() {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/sports/1/events/4',
            data: this.editformdata
        }).then(function(result){
            controller.editformdata = {};
            controller
        })
    };

    this.removeEvent = function() {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/sports/1/events/3',
            data: this.deletedata
        }).then(function(result){
            console.log('deleting');
            console.log(result);
        });
    };

    this.showSportEvents = function(id) {
        this.showSpecificSportEvents = id;
        console.log(this.showSpecificSportEvents);
    }

    /* ***** Events Page **** */

    // get events for all sports
    this.getAllEvents = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/sports/all/events'
      }).then(function(result){
        console.log(result);
        controller.allEvents = result.data
      });
    };

    // from http://stackoverflow.com/questions/23983322/angularjs-checkbox-filter
    function noFilter(filterObj) {
      return Object.
        keys(filterObj).
        every(function (key) { return !filterObj[key]; });
    }

    this.filterEventsBySport = function(event) {
      var filter = this.eventSearchFilterSports;
      return filter[event.sport.name] || noFilter(filter)
    }.bind(this)

    this.filterEventsByGender = function(event) {
      console.log(event);
      var filter = this.eventSearchFilterGenders;
      return filter[event.gender] || noFilter(filter)
    }.bind(this)

}]);
