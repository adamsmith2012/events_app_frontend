console.log('app.js');

var app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
    this.message = "angular works!";
    this.sports = [];
    this.events = [];
    this.eventSearchFilterSports = {};
    this.eventSearchFilterGenders = {};
    this.selected_partial = 'index';
    var controller = this;


    this.getSports = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports'
        }).then(function(result){
            console.log(result);
            controller.sports = result.data;
            console.log(controller.sports);
        });
    };

    // get events for specific sport
    this.getEvents = function(id) {
        this.sport_id = id;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports/'+ id + '/events'
        }).then(function(result){
            console.log(result);
            controller.events = result.data
            console.log(controller.events);
        });
    };
    this.getSports();
    this.getEvents();

    this.addEvent = function(sport) {
      console.log(sport);
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


    this.goToSportsShowPage = function(id) {
        console.log(id);
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports'
        }).then(function(result){
            controller.sports = result.data;

                for(i=0; i<controller.sports.length; i++){
                    controller.sports[i].is_showing = false
                }
                controller.sports[id - 1].is_showing = true;

        });
    };

    this.leaveSportsShowPage = function(id) {
        console.log(id);
        $http({
            method: 'GET',
            url: 'http://localhost:3000/sports'
        }).then(function(result){

                for(i=0; i<controller.sports.length; i++){
                    controller.sports[i].is_showing = false
                }

        });
    };




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

    this.filterEvents = function(event) {
      var sportFilter = this.eventSearchFilterSports;
      var genderFilter = this.eventSearchFilterGenders;
      return (sportFilter[event.sport.name] || noFilter(sportFilter)) &&
             (genderFilter[event.gender] || noFilter(genderFilter))
    }.bind(this)

}]);
