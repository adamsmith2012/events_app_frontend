console.log('app.js');

var app = angular.module('MyApp', ["ngRoute"]);

if(window.location.origin == "http://localhost:8000") {
  DB_URL = "http://localhost:3000";
}
else {
  DB_URL = "https://events-app-api.herokuapp.com";
}

app.controller('mainController', ['$http', function($http){
    this.message = "angular works!";
    this.sports = [];
    this.events = [];
    this.eventSearchFilterSports = {};
    this.eventSearchFilterGenders = {};
    this.selected_partial = 'index';
    var controller = this;
    this.today = new Date(Date.now());
    console.log(this.today);


    this.getSports = function() {
        $http({
            method: 'GET',
            url: DB_URL + '/sports'
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
            url: DB_URL + '/sports/'+ id + '/events'
        }).then(function(result){
            console.log(result);
            controller.events = result.data
            console.log("===============");
            console.log(controller.events);
        });
    };
    this.getSpecificEvent = function(id) {
        this.sport_id = id;
        $http({
            method: 'GET',
            url: DB_URL + '/sports/'+ id + '/events/' + id
        }).then(function(result){
            console.log(result);
            controller.specificEvents = result.data
            console.log("===============");
            console.log(controller.specificEvents);
            controller.event_date = new Date(controller.specificEvents.date);
        });
    };

    this.getSports();
    this.getEvents();

    this.addEvent = function() {
      console.log("hello");
      var sport = this.createformdata.sport_id;
        $http({
            method: 'POST',
            url: DB_URL + '/sports/' + sport +'/events',
            data: this.createformdata
        }).then(function(result){
            controller.createformdata = {};
            controller.events.unshift(result.data)
            controller.getAllEvents();
            controller.selected_partial='events';
        });
    };

    this.editEvent = function() {
      var id = this.specificEvents.id

      console.log(id);

        $http({
            method: 'PUT',
            url: DB_URL + '/sports/'+ id + '/events/' + id,
            data: this.editformdata
        }).then(function(result){
            controller.editformdata = {};
            controller
        })
    };

    this.removeEvent = function(sportid,eventid) {
        $http({
            method: 'DELETE',
            url: DB_URL + '/sports/' + sportid + '/events/' + eventid,
            data: this.deletedata
        }).then(function(result){
            console.log('deleting');
            console.log(result);
            controller.getAllEvents();
            controller.selected_partial='events';
        });
    };


    this.goToSportsShowPage = function(id) {
        console.log(id);
        $http({
            method: 'GET',
            url: DB_URL + '/sports'
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
            url: DB_URL + '/sports'
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
        url: DB_URL + '/sports/all/events'
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

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { //.config just runs once on load
    $locationProvider.html5Mode({ enabled: true, requireBase: false }); // tell angular to use push state
    $routeProvider
    .when("/", {
        templateUrl : "/partials/index-partial.html"
    })
    .when("/events", {
        templateUrl : "/partials/event-search.html"
    })
    .when("/event/show", {
        templateUrl : "/partials/event-show-page.html"
    })
    .when("/sports", {
        templateUrl : "/partials/sportshowpage.html"
    })
    .when("/event/edit", {
        templateUrl : "/partials/edit-event.html"
    });
}]);
