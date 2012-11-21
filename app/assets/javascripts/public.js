$(document).ready(function(){
  //This gets triggered when selection in drop-down is changed
  $("select").change(changeSelect)
  .trigger('change');

  //Set origin and destination variables
  function changeSelect(){
    $("select[name='origin'] option:selected").each(function(){
      origin = $(this).val();
    });
    $("select[name='dest'] option:selected").each(function(){
      dest = $(this).val();
    });

    if(origin != dest){
    //As long as they are two different stations, make request
      $.ajax("checkbike",
      {
        type: 'PUT',
        data: {
          depart: origin,
          arrive: dest        
        },
        complete: function(response){
          console.log(response);
          $("#response").text(response.responseText);
        }
      });
    };
  };
  //refresh the time every second
  function timeRefresh() {
    $(".timeDiv").load('public/time');
    setTimeout(timeRefresh, 1000);
  }
  timeRefresh();
});
