$(document).ready(function(){
  $("select").change(changeSelect)
  .trigger('change');

  function changeSelect(){
    $("select[name='origin'] option:selected").each(function(){
      origin = $(this).val();
    });
    $("select[name='dest'] option:selected").each(function(){
      dest = $(this).val();
    });


    if(origin != dest){
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



  }


});