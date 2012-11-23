Bikecheck::Application.routes.draw do
  root to: "public#index"
  get "checkbike/:depart/:arrive", :controller=> "public", :action=> "checkBike"
  get "stationlist", :controller=> "public", :action=>"listStations"
end
