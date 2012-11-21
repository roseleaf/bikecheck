Bikecheck::Application.routes.draw do
  root to: "public#index"
  put "checkbike", :controller=> "public", :action=> "checkBike"
  get "public/time"
end
