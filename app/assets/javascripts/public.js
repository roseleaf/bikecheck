$(document).ready(function(){
  //This gets triggered when selection in drop-down is changed
  $("select").change(changeSelect)
  .trigger('change');

  //Placeholder variables to set the destination station, and hit the API on pageload:
  var first = $("select[name='origin'] option:first").val();
  var last = $("select[name='origin'] option:last-child").val();
  checkBart(first, last);
  var hour = "";
  var minute = "";
  var period = "";

  //Set origin variable based on user input
  function changeSelect(){
    $("select[name='origin'] option:selected").each(function(){
      origin = $(this).val();
    });

    //Set destination to either the first or last station
    if(origin == first){
      dest = last;
    } else{
      dest = first;
    }

    checkBart(origin, dest);
  };

  function checkBart(origin, dest){
    //Give user 1/2 second feedback that their request was received
    $("#response").text("checking...").delay(500);

    if(origin && dest){
    //As soon as the input is set, make request
      $.ajax("checkbike",
      {
        type: 'PUT',
        data: {
          depart: origin,
          arrive: dest        
        },
        complete: function(response){
          fillInResponse(response);
        }
      });
    };
  };
  
  //Display Bart is closed text if it is after hours:
  function fillInResponse(response){
    if(hour == 0 && minute > 25 || hour > 0 && hour < 04 && period == "AM" ){
      $("#response").text("Bart's closed, check back after 4AM, Cowboy.");
    } else {
      $("#response").text(response.responseText);
    };
  };


  //refresh the time every second
  function timeRefresh() {
    var currentTime = new Date();
    hour = currentTime.getHours();
    minute = currentTime.getMinutes();
    if(hour > 11){ period = "PM" } else { period = "AM" };
    if(hour > 12){ hour -= 12 };
    if(hour == 0){ hour = 12 };
    if(minute < 10){ minute = "0" + minute }
    $("#hour").text(hour);
    $("#minute").text(minute + " " + period );
    setTimeout(timeRefresh, 1000);
  }
  timeRefresh();
});
