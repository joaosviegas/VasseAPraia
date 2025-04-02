import requests
import datetime
import re

# URLs for the API endpoints
url_stations = "https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json"
url_weather = "https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json"
url_uv = "https://api.ipma.pt/open-data/forecast/meteorology/uv/uv.json"
url_warnings = "https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json"
url_sea = "https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day0.json"

GLOBALID_FNC = 2310300
GLOBALID_FNC_COSTEIRO = 2310326
GLOBALID_PXO = 2320100
GLOBALID_PXO_COSTEIRO = 2320126

class DataRetrievalException(Exception):
    """
    Exception raised for errors in the data retrieval process.

    Attributes:
        message -- explanation of the error
    """
    def __init__(self, message="Erro de conexão ao tentar obter os dados...\n"):
        self.message = message
        super().__init__(self.message)

# ========== STATION DATA RETRIEVAL AND PROCESSING ==========

def calc_valid_hours():
    """
    Calculates the number of valid hours for the current day.

    Returns:
        int: The number of valid hours for the current day.
    """
    # Get current hour
    now = datetime.datetime.now()
    current_hour = now.hour

    # Calculate valid hours based on current time
    valid_hours = 0
    if current_hour >= 10 and current_hour <= 18:
        valid_hours = current_hour - 10 + 1

    return valid_hours

def clean_station_name(station_name):
    """
    Removes the 'Madeira, ' prefix from station names.

    Args:
        station_name (str): The full station name.

    Returns:
        str: The cleaned station name without the 'Madeira, ' prefix.
    """
    if station_name.startswith("Madeira, "):
        station_name = station_name[len("Madeira, "):]
    
    station_name = re.sub(r'\s*\(.*\)', '', station_name)

    return station_name

def attribute_city_by_name(station_name):
    """
    Returns the city name based on the station name.

    Args:
        station_name (str): The full station name.

    Returns:
        str: The city name extracted from the station name.
    """
    if "Funchal" in station_name:
        return "Funchal"
    elif "Porto Moniz" in station_name:
        return "Porto Moniz"
    elif "Santana" in station_name:
        return "Santana"
    elif "São Vicente" in station_name:
        return "São Vicente"
    elif station_name == "Cancela" or "Santa Cruz" in station_name:
        return "Santa Cruz"
    elif station_name == "S. Lourenço":
        return "Machico"
    elif "Calheta" in station_name:
        return "Calheta"
    elif station_name == "Quinta Grande":
        return "Câmara de Lobos"
    elif station_name == "Ponta do Sol":
        return "Ponta do Sol"
    elif station_name == "Porto Santo":
        return "Porto Santo"
    else:
        return None

def get_madeira_stations(stations):
    """
    Filters the weather stations to only include the ones from Madeira.

    Args:
        stations (list): List of weather stations.

    Returns:
        dict: Dictionary with station IDs as keys and station names as values.
    """
    madeira_stations = {}
    for station in stations:
        local_estacao = station['properties'].get('localEstacao')
        if local_estacao and "Madeira" in local_estacao or "Porto Santo" in local_estacao or "Santa Cruz" in local_estacao or "Ponta do Sol" in local_estacao or "Ponta do Pargo" in local_estacao:
            station_id = station['properties']['idEstacao']
            madeira_stations[station_id] = clean_station_name(local_estacao)
    return madeira_stations

def get_station_name(station_id, madeira_stations_dict):
    """
    Gets the name of a station given its ID.

    Args:
        station_id (int): The ID of the station.

    Returns:
        str: The name of the station or "N/A" if the station ID is not found.
    """
    return madeira_stations_dict.get(station_id, "N/A")

def get_station_id(station_name, madeira_stations_dict):
    """
    Gets the ID of a station given its name.

    Args:
        station_name (str): The name of the station.

    Returns:
        int: The ID of the station or "N/A" if the station name is not found.
    """
    return next((station_id for station_id, name in madeira_stations_dict.items() if name == station_name), "N/A")

def get_wind_direction(direction_id):
    """
    Helper function to map wind direction IDs to cardinal directions.
    
    Args:
        direction_id: Integer representing wind direction.
        
    Returns:
        str: Cardinal direction corresponding to the ID.
    """
    wind_directions = {
        0: 'N', 1: 'NE', 2: 'E', 3: 'SE',
        4: 'S', 5: 'SW', 6: 'W', 7: 'NW'
    }
    return wind_directions.get(direction_id, 'Desconhecida')

def organize_data_by_station(weather, madeira_stations_dict):
    """
    Organizes the weather data by station with a simplified structure.
    Each station ID maps to a dictionary containing all metrics.
    
    Args:
        weather (dict): Raw weather data from API.
        madeira_stations_dict (dict): Dictionary of Madeira stations.
        
    Returns:
        dict: Organized weather data by station.
    """
    stations_data = {}
    
    # Initialize dictionaries for each station in Madeira
    for station_id in madeira_stations_dict:
        stations_data[station_id] = {
            'nome': madeira_stations_dict[station_id],
            'city': attribute_city_by_name(madeira_stations_dict[station_id]),
            'idEstacao': station_id,
            'max_temp': float('-inf'),
            'min_temp': float('inf'),
            'max_radiation': float('-inf'),
            'total_precipitation': 0,
            'readings': []  # Will store timestamp-based readings
        }

    # Process weather data
    for timestamp, station in weather.items():
        if station is None:
            continue
            
        for station_id_str, data in station.items():
            if data is None:
                continue
                
            station_id = int(station_id_str)
            if station_id not in madeira_stations_dict:
                continue
            
            # Handle -99 values (missing data)
            cleaned_data = {k: v if v != -99 else None for k, v in data.items()}
            
            # Add timestamp and station info
            reading = {
                'horario': timestamp,
                **cleaned_data,
                'direccaoVento': get_wind_direction(cleaned_data.get('idDireccVento')),
                'ventoforte': False  # Default value as in original code
            }
            
            # Update max/min values
            if reading.get('temperatura') is not None:
                stations_data[station_id]['max_temp'] = max(
                    stations_data[station_id]['max_temp'], 
                    reading['temperatura']
                )
                stations_data[station_id]['min_temp'] = min(
                    stations_data[station_id]['min_temp'], 
                    reading['temperatura']
                )
            
            if reading.get('radiacao') is not None:
                stations_data[station_id]['max_radiation'] = max(
                    stations_data[station_id]['max_radiation'], 
                    reading['radiacao']
                )
            
            # Accumulate precipitation
            if reading.get('precAcumulada') is not None:
                stations_data[station_id]['total_precipitation'] += reading['precAcumulada']
            
            # Store the reading
            stations_data[station_id]['readings'].append(reading)
    
    # Remove irrelevant to the app stations
    stations_to_remove = [station_id for station_id, data in stations_data.items() if data['city'] is None]
    for station_id in stations_to_remove:
        stations_data.pop(station_id) 

    return stations_data

def sort_data_by_time(stations_data):
    """
    Sorts the weather data for each station by timestamp.
    
    Args:
        stations_data (dict): Dictionary with station IDs as keys and weather data as values.

    Returns:
        dict: The same dictionary with readings sorted by timestamp.
    """
    for station_id, data in stations_data.items():
        data['readings'] = sorted(data['readings'], key=lambda x: x['horario'])
    
    return stations_data

def filter_data_by_time_range(station_data, current_day_only=True):
    """
    Filters station data to include only entries from the current day.
    
    Args:
        station_data (dict): Weather data for a station.
        current_day_only (bool): If True, filters data from 00:00 today until current time.
                                If False, uses the legacy behavior (10:00-18:00).

    Returns:
        dict: Filtered station data.
    """
    filtered_readings = []
    
    if current_day_only:
        # Get current date and time
        from datetime import datetime
        now = datetime.now()
        current_date = now.strftime("%Y-%m-%d")
        current_hour = now.strftime("%H:%M")
        
        for entry in station_data['readings']:
            timestamp = entry.get('horario', '')
            if timestamp:
                # Extract date and time from timestamp
                date_part = timestamp.split('T')[0]
                hour_part = timestamp.split('T')[1][:5]  # Extract "HH:MM" from timestamp
                
                # Check if the entry is from today and before or equal to current hour
                if date_part == current_date and hour_part <= current_hour:
                    filtered_readings.append(entry)
    else:
        # Original behavior (10:00-18:00)
        start_time = "10:00"
        end_time = "18:00"
        
        for entry in station_data['readings']:
            timestamp = entry.get('horario', '')
            if timestamp:
                hour = timestamp.split('T')[1][:5]  # Extract "HH:MM" from timestamp
                if start_time <= hour <= end_time:
                    filtered_readings.append(entry)

    # Create a new dictionary with the filtered readings
    filtered_data = {
        'readings': filtered_readings,
        'nome': station_data['nome'],
        'idEstacao': station_data['idEstacao'],
        'max_temp': station_data['max_temp'],
        'min_temp': station_data['min_temp'],
        'max_radiation': station_data['max_radiation'],
        'total_precipitation': station_data['total_precipitation']
    }

    return filtered_data

def get_uv_index_data(uv_data):
    """
    Retrieves the UV index data from the API response.

    Args:
        uv_data (dict): The raw UV index data.

    Returns:
        dict: The UV index data for Madeira.
    """
    uv_info = {}
    for u in uv_data:
        if u['globalIdLocal'] == GLOBALID_FNC and u['data'] == datetime.datetime.now().strftime("%Y-%m-%d"):
            uv_info['Madeira'] = {
                'iUv': u['iUv'],
                'intervaloHora': "Horário Indisponível" if u['intervaloHora'] == "" else u['intervaloHora']

            }
        elif u['globalIdLocal'] == GLOBALID_PXO and u['data'] == datetime.datetime.now().strftime("%Y-%m-%d"):
            uv_info['Porto Santo'] = {
                'iUv': u['iUv'],
                'intervaloHora': "Horário Indisponível" if u['intervaloHora'] == "" else u['intervaloHora']
            }
    return uv_info

def get_weather_warnings(warnings):
    """
    Retrieves weather warnings from the API response.

    Args:
        warnings (dict): The raw weather warnings data.

    Returns:
        dict: The weather warnings for Madeira.
    """
    weather_warnings = {}
    for w in warnings:
        if w['idAreaAviso'] == 'MCS' and w['awarenessLevelID'] != 'green':
            weather_warnings['Madeira'] = {
                'awarenessTypeName': w['awarenessTypeName'],
                'text': w['text'],
                'awarenessLevelID': w['awarenessLevelID'],
                'startTime': w['startTime'],
                'endTime': w['endTime']
            }
        elif w['idAreaAviso'] == 'MPS' and w['awarenessLevelID'] != 'green':
            weather_warnings['Porto Santo'] = {
                'awarenessTypeName': w['awarenessTypeName'],
                'text': w['text'],
                'awarenessLevelID': w['awarenessLevelID'],
                'startTime': w['startTime'],
                'endTime': w['endTime']
            }
    return weather_warnings

def get_sea_data(sea_data):
    """
    Retrieves sea forecast data from the API response.

    Args:
        sea_data (dict): The raw sea forecast data.

    Returns:
        dict: The sea forecast data for Madeira.
    """
    sea_info = {}
    # Extract the 'data' key, which contains the list of sea data
    sea_data_list = sea_data.get('data', [])

    # Iterate over the list of sea data
    for s in sea_data_list:
        if s['globalIdLocal'] == GLOBALID_FNC_COSTEIRO:
            sea_info['Madeira'] = {
                'seaTemp': s.get('sstMax', 'N/A'),
                'waveHighMax': s.get('waveHighMax', 'N/A'),
                'waveHighMin': s.get('waveHighMin', 'N/A')
            }
        elif s['globalIdLocal'] == GLOBALID_PXO_COSTEIRO:
            sea_info['Porto Santo'] = {
                'seaTemp': s.get('sstMax', 'N/A'),
                'waveHighMax': s.get('waveHighMax', 'N/A'),
                'waveHighMin': s.get('waveHighMin', 'N/A')
            }

    return sea_info

# ========== STATION EVALUATION AND RANKING ==========

def evaluate_station(station_data):
    """
    Evaluates a station based on weather criteria with improved fairness.
    
    Args:
        station_data (dict): Weather data for a station.
        
    Returns:
        dict: Evaluation metrics, scores, and warnings.
    """
    total_points = 0
    metrics = {
        'total_hours_above_20': 0,
        'total_sun_hours': 0,
        'total_precipitation': station_data.get('total_precipitation', 0),
        'average_wind_speed': 0,
        'wind_gusts': 0,
        'comfort_index': 0,
        'warnings': []
    }
    
    valid_hours = 0
    total_wind = 0
    
    for entry in station_data['readings']:
        temp = entry.get('temperatura')
        wind = entry.get('intensidadeVentoKM')
        radiation = entry.get('radiacao')
        
        # Temperature scoring
        if temp is not None and temp >= 20:
            metrics['total_hours_above_20'] += 1
            total_points += 5
        
        # Solar radiation scoring
        if radiation is not None:
            if radiation > 5:
                metrics['total_sun_hours'] += 1

        # Wind calculations
        if wind is not None and wind > 0:
            total_wind += wind
            valid_hours += 1
            if wind > 20:
                metrics['wind_gusts'] += 1
    
    # Last wind and last precipitation penalties
    if stattiprecip := station_data['readings'][-1].get('precAcumulada', 0):
        if stattiprecip == 0:
            total_points += 5
        elif stattiprecip > 0:
            total_points -= 5

    if lastwind := station_data['readings'][-1].get('intensidadeVentoKM', 0):
        if lastwind <= 10:
            total_points += 5
        elif lastwind >= 20:
            total_points -= 5

    # Calculate averages
    if valid_hours > 0:
        metrics['average_wind_speed'] = total_wind / valid_hours
    
    # Add warnings for extreme conditions
    if metrics['average_wind_speed'] > 10 and metrics['average_wind_speed'] < 20:
        total_points -= metrics['average_wind_speed'] * 0.25  # Additional penalty for consistently strong winds
        
    elif metrics['average_wind_speed'] >= 20:
        metrics['warnings'].append("Strong winds warning")
        total_points -= metrics['average_wind_speed'] * 0.5  # Additional penalty for consistently strong winds
    
    if metrics['total_precipitation'] > 10:
        metrics['warnings'].append("Heavy rain warning")
        total_points -= 15  # Additional penalty for heavy total precipitation

    # Add warnings for extreme conditions
    max_hours = calc_valid_hours()
    if metrics['total_sun_hours'] > max_hours:
        total_points += max_hours * 5
    else:
        total_points += metrics['total_sun_hours'] * 5
    
    # Define weights for each factor (adjustable)
    WEIGHTS = {
        'hours_above_20': 5,  # Points per hour above 20°C
        'sun_hours': 3,       # Points per hour of sun
        'precipitation': -5,  # Penalty per mm of precipitation
        'wind_speed': -0.2,   # Penalty per km/h of average wind speed
        'wind_gusts': -2      # Penalty per wind gust
    }

    # Calculate maximum possible points
    max_hours = calc_valid_hours()
    max_possible_points = (
        (max_hours * WEIGHTS['hours_above_20']) +  # All hours above 20°C
        (max_hours * WEIGHTS['sun_hours']) +      # All hours with sun
        (0 * WEIGHTS['precipitation']) +          # No precipitation
        (0 * WEIGHTS['wind_speed']) +             # No wind
        (0 * WEIGHTS['wind_gusts'])               # No wind gusts
    )

    # Calculate comfort index as a percentage of total points
    if max_possible_points > 0:
        metrics['comfort_index'] = (total_points / max_possible_points) * 100
        metrics['comfort_index'] = max(0, min(100, metrics['comfort_index']))  # Clamp between 0-100
    else:
        metrics['comfort_index'] = 0

    return {
        'total_points': int(total_points),
        'metrics': metrics,
        'max_temp': "Indisponível" if station_data['max_temp'] == float('-inf') else station_data['max_temp'],
        'min_temp': "Indisponível" if station_data['min_temp'] == float('inf') else station_data['min_temp'],
        'max_radiation': station_data.get('max_radiation', 0),
        'last_precipitation': float(station_data['readings'][-1].get('precAcumulada', 0) or 0) if station_data['readings'] else 0,
        'warnings': metrics['warnings']
    }

def rank_stations(stations_data, madeira_stations_dict):
    """
    Ranks all stations based on the beach weather criteria.

    Args:
        stations_data (dict): Dictionary with station IDs as keys and weather data as values.
        madeira_stations_dict (dict): Dictionary with station IDs as keys and station names as values.

    Returns:
        list: List of dictionaries containing station rankings and metrics.
    """
    rankings = []

    for station_id, data in stations_data.items():
        # Filter data for the time range (10:00h to 18:00h)
        filtered_data = filter_data_by_time_range(data)

        # Evaluate the station
        evaluation = evaluate_station(filtered_data)

        # Add station name and ID to the evaluation
        evaluation['station_id'] = station_id
        evaluation['station_name'] = madeira_stations_dict.get(station_id, "N/A")
        evaluation['city'] = data.get('city', "N/A")

        # Add to rankings
        rankings.append(evaluation)

    # Sort by max_temp (descending)
    rankings.sort(key=lambda x: x['max_temp'], reverse=True)

    # Attribute points to the top N stations
    bonus_points = [7, 5, 3, 2, 1, 0, -1, -2, -3, -4, -5]
    for i, station in enumerate(rankings):
        if i < len(bonus_points):  # Only assign points to the top N stations
            station['total_points'] += bonus_points[i]
            station['metrics']['comfort_index'] = max(0, min(100, station['metrics']['comfort_index'] + bonus_points[i] * 0.5))  # Adjust comfort index

    # Sort rankings by total points (descending)
    rankings.sort(key=lambda x: x['total_points'], reverse=True)

    return rankings

# ========== DISPLAY FUNCTIONS ==========

def show_all_madeira_stations(madeira_stations_dict):
    """
    Prints the names of all Madeira weather stations.

    Args:
        madeira_stations_dict (dict): Dictionary with station IDs as keys and station names as values.
    """
    for station_id, station_name in madeira_stations_dict.items():
        print(f" ID: {station_id} Nome: {station_name}")

def print_station(station):
    """
    Prints detailed weather information for a station.
    
    Args:
        station (dict): Weather data for a station.
    """
    if isinstance(station, dict) and 'readings' in station:
        readings = station['readings']
        
        if not readings:
            print(f"\n=== ESTAÇÃO: {station.get('nome', 'N/A')} (ID: {station.get('idEstacao', 'N/A')}) ===")
            print("Sem dados disponíveis.")
            return
        
        print(f"\n=== ESTAÇÃO: {station.get('nome', 'N/A')} (ID: {station.get('idEstacao', 'N/A')}) ===")
        print(f"Temperatura máxima: {station.get('max_temp', 'N/A')}°C")
        print(f"Temperatura mínima: {station.get('min_temp', 'N/A')}°C")
        print(f"Radiação máxima: {station.get('max_radiation', 'N/A')} kW/m²")
        print(f"Precipitação acumulada: {station.get('total_precipitation', 'N/A')} mm")
        
        for reading in readings:
            if reading is not None:
                print(f"\n  Horário: {reading.get('horario', 'N/A')}")
                print(f"  Temperatura: {reading.get('temperatura', 'N/A')}°C")
                print(f"  Humidade: {reading.get('humidade', 'N/A')}%")
                print(f"  Pressão: {reading.get('pressao', 'N/A')} hPa")
                print(f"  Vento: {reading.get('intensidadeVentoKM', 'N/A')} km/h")
                print(f"  Direção do vento: {reading.get('direccaoVento', 'N/A')}")
                print(f"  Radiação solar: {reading.get('radiacao', 'N/A')} kW/m²")
                print(f"  Precipitação acumulada: {reading.get('precAcumulada', 'N/A')} mm")
                print(f"  Vento forte: {'Sim' if reading.get('ventoforte', False) else 'Não'}")

def show_station(station_name, madeira_stations_dict, station_data):
    """
    Prints the weather data of a specific station.

    Args:
        station_name (str): The name of the station.
        madeira_stations_dict (dict): Dictionary with station IDs as keys and station names as values.
        station_data (dict): Dictionary with station IDs as keys and weather data as values.
    """
    if station_name not in madeira_stations_dict.values() and station_name != "fim":
        print(f"Estação '{station_name}' não encontrada.\n")
        return
    
    station_id = get_station_id(station_name, madeira_stations_dict)
    if station_id in station_data:
        print_station(station_data[station_id])

def show_all_data(stations_data, madeira_stations_dict):
    """
    Prints all the weather data of all stations.

    Args:
        stations_data (dict): Dictionary with station IDs as keys and weather data as values.
        madeira_stations_dict (dict): Dictionary with station IDs as keys and station names as values.
    """
    for station_id, data in stations_data.items():
        if station_id in madeira_stations_dict:
            print_station(data)

def display_rankings(rankings):
    """
    Updated ranking display with new metrics and warnings.
    """
    print("\nRanking de Praias (Melhores Condições Meteorológicas):")
    print("{:<5} {:<20} {:<25} {:<8} {:<10} {:<10} {:<10} {:<15} {:<10} {:<15}".format(
        "Pos.", "Concelho:", "Estação", "Pontos", "Max Temp", "Hrs >20°", "Chuva (mm)", "Vento Médio", "Conforto", "Avisos"
    ))
    
    for i, station in enumerate(rankings, start=1):
        # Create a compact warning display
        warnings_text = ""
        if 'warnings' in station and station['warnings']:
            if isinstance(station['warnings'], list):
                warnings_icons = {"Strong winds warning": "💨", "Heavy rain warning": "🌧️"}
                warnings_text = " ".join([warnings_icons.get(w, "⚠️") for w in station['warnings']])
            else:
                warnings_text = "⚠️"
        
        print("{:<5} {:<20} {:<25} {:<8} {:<10} {:<10} {:<10.1f} {:<15.1f} {:<10.1f} {:<15}".format(
            f"{i}.",
            station['station_name'],
            station['city'],
            station['total_points'],
            station['max_temp'],
            station['metrics']['total_hours_above_20'],  # Changed from sun_hours to hours >20°
            station['last_precipitation'],
            station['metrics']['average_wind_speed'],
            station['metrics']['comfort_index'],
            warnings_text
        ))
    
    # Add a legend for the warning icons
    print("\nLegenda de Avisos:")
    print("💨 - Ventos Fortes (>20 km/h)")
    print("🌧️ - Chuva Intensa (>10 mm)")

# ========== MAIN FUNCTION ==========

def main():
    print("Starting Madeira Beach Weather Analysis...")
    
    try:
        # Get API data
        print("Fetching station data from API...")
        stations = requests.get(url_stations).json()
        weather = requests.get(url_weather).json()
        
        # Process API data
        madeira_stations = get_madeira_stations(stations)
        stations_data = organize_data_by_station(weather, madeira_stations)
        stations_data = sort_data_by_time(stations_data)
        
        while True:
            # Display options
            print("\nOpções:")
            print("1. Mostrar todas as estações da Madeira")
            print("2. Mostrar dados de uma estação específica")
            print("3. Mostrar todos os dados")
            print("4. Mostrar ranking")
            print("5. Sair")
            
            option = input("Escolha uma opção: ")
            
            if option == "1":
                show_all_madeira_stations(madeira_stations)
            elif option == "2":
                station_name = input("Insira o nome da estação (ou 'fim' para sair): ")
                show_station(station_name, madeira_stations, stations_data)
            elif option == "3":
                show_all_data(stations_data, madeira_stations)
            elif option == "4":
                rankings = rank_stations(stations_data, madeira_stations)
                display_rankings(rankings)
            elif option == "5":
                print("Programa encerrado.")
                break
            else:
                print("Opção inválida.")
                
    except Exception as e:
        print(f"An error occurred: {str(e)}")

#main()