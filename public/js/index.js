// Get references to page elements
//index
var $eventType = $("#event-type");
var $eventDescription = $("#event-description");
var $eventLocation = $("#event-location");
var $eventDate = $("#event-date");
var $eventTime = $("#event-time");
var $numOfPlayers = $("#players");
var $submitBtn = $("#submit");
var $eventList = $("#event-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/events",
      data: JSON.stringify(event)
    });
  },
  getEvents: function() {
    return $.ajax({
      url: "api/events",
      type: "GET"
    });
  },
  deleteEvent: function(id) {
    return $.ajax({
      url: "api/events/" + id,
      type: "DELETE"
    });
  }
};

// refreshevents gets new events from the db and repopulates the list
var refreshEvents = function() {
  API.getEvents().then(function(data) {
    var $events = data.map(function({category, description, id}) {
      var $a = $("<a>")
        .text(category)
        .attr("href", "/event/" + id);
      var $description = $("<div>").text(description);



      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": id
        })
        .append($a, $description);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    // $eventList.empty();
    // $eventList.append($events);

    $eventList.html($events);
  });
};

// handleEventCreate is called whenever we submit a new event
// Save the new event to the db and refresh the list
var handleEventCreate = function(event) {
  event.preventDefault();

  var newEvent = {
    category: $eventType.val().trim(),
    description: $eventDescription.val().trim(),
    location: $eventLocation.val().trim(),
    eventDate: $eventDate.val().trim(),
    timeOfEvent: $eventTime.val().trim(),
    maxPlayers: $numOfPlayers.val().trim(),
    currentPlayers: 1

  };

  if (!(newEvent.category && newEvent.description)) {
    alert("You must select an event type and enter description!");
    return;
  }

  API.saveEvent(newEvent).then(function() {
    refreshEvents();
  });

  alert("Event Sucessfully Created!");

  $eventType.val("");
  $eventDescription.val("");
  $eventLocation.val("");
  $eventDate.val("");
  $eventTime.val("");
  $numOfPlayers.val("");
};

// Add event listeners to the submits
$submitBtn.on("click", handleEventCreate);
