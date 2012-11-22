$(document).ready(function(){
  //This gets triggered when selection in drop-down is changed
  $("select").change(changeSelect)
  .trigger('change');

  //Placeholder variables to set the destination station, and hit the API on pageload:
  var first = $("select[name='origin'] option:first").val();
  var last = $("select[name='origin'] option:last-child").val();
  checkBart(first, last);

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
    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    if(hour == 0 && minute > 25 || hour < 04){
      $("#response").text("Bart's closed, check back after 4AM, Cowboy.");
    } else {
      $("#response").text(response.responseText);
    };
  };


  //refresh the time every second
  function timeRefresh() {
    $(".timeDiv").load('public/time');
    setTimeout(timeRefresh, 1000);
  }
  timeRefresh();
});
