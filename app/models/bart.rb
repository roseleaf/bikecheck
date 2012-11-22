class Bart 
  attr_accessor :stations, :response
  API_KEY = "MW9S-E7SL-26DU-VV8V"


  def self.getStations
    path = "http://api.bart.gov/api/stn.aspx"
    query_values = {
      key: API_KEY,
      cmd: "stns"
    }
    params = RestClient.get(path, {:params => query_values})
    parsed_data = Crack::XML.parse(params)  
    stationinfo = parsed_data["root"]["stations"]["station"]
    abbrs = Hash.new
    stationinfo.each do |station|
      abbrs.store(station["name"], station["abbr"])
    end
    return abbrs
  end

  def station_names
    station_list = getStations
    station_names = []
    station_list.each do |station|
      station_names << station["name"]
    end
    return station_names
  end

  def self.is_bike_allowed(depart, arrive)
    path = "http://api.bart.gov/api/sched.aspx"
    query_values = {
      key: API_KEY,
      cmd: "depart",
      orig: depart,
      dest: arrive
    }

    params = RestClient.get(path, {params: query_values})
    parsed_data = Crack::XML.parse(params)

    legs = parsed_data["root"]["schedule"]["request"]["trip"]
    bikeflags = []

    Rails.logger.info(legs)
    
    legs.each do |leg|
      bikeflags << leg["bikeflag"]
    end

    if bikeflags.include?("0")
      return "not now, cowboy. It's been outlawed."
    else
      return "better mount up, rough rider. It's allowed!"
    end

  end

end
