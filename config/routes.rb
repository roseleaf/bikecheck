Bikecheck::Application.routes.draw do
  root to: "public#index"
  put "checkbike", :controller=> "public", :action=> "checkBike"
  get "stationlist", :controller=> "public", :action=>"listStations"
end
