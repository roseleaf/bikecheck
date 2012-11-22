class PublicController < ApplicationController
  def index 
    @stations = Bart::getStations
  end

  def checkBike
    Bart::is_bike_allowed(params[:depart], params[:arrive])
    render json: Bart::is_bike_allowed(params[:depart], params[:arrive])
  end

  def listStations
    Bart::getStations
    render json: Bart::getStations
  end

end
