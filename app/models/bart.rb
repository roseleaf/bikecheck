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

    legs.each do |leg|
      bikeflags << leg["bikeflag"]
    end

    # Once in a while, the "legs" appears to not be a normal hash and will not select by key,
    # so we add a brute-force fallback here to make sure we return the correct result:
    if bikeflags.include?("0") || parsed_data.to_s.include?('"bikeflag"=>"0"')
      return "not now, cowboy. It's been outlawed."
    else
      return "better mount up, rough rider. It's allowed!"
    end
  end
  # BART is trying to be really cool and nice with their API, but it still needs a lot of work!
end
