class PublicController < ApplicationController
  def index 
    @stations = Bart::getStations
  end

  def checkBike
    Bart::is_bike_allowed(params[:depart], params[:arrive])
    render json: Bart::is_bike_allowed(params[:depart], params[:arrive])
  end

  def time
    @hour = Time.now.strftime("%-I")
    @minute = Time.now.strftime("%M %p")
    render :partial => 'time'
  end
end
