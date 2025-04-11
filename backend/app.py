from flask import Flask, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import os
import requests
from beach_ranker import (  # Explicit imports
    url_stations, 
    url_weather,
    url_uv,
    url_warnings,
    url_sea,
    get_sea_data,
    get_weather_warnings,
    get_uv_index_data,
    get_madeira_stations,
    organize_data_by_station,
    sort_data_by_time,
    rank_stations,
    has_meaningful_data
)

app = Flask(__name__)
CORS(app)  # Allow frontend access

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/rankings', methods=['GET'])
def get_rankings():
    try:
        # 1. Get real-time data with error handling
        try:
            stations_res = requests.get(url_stations)
            weather_res = requests.get(url_weather)
            uv_res = requests.get(url_uv)
            warnings_res = requests.get(url_warnings)
            sea_res = requests.get(url_sea)
            sea_res.raise_for_status()
            warnings_res.raise_for_status()
            uv_res.raise_for_status()
            stations_res.raise_for_status()
            weather_res.raise_for_status()
        except requests.exceptions.RequestException as e:
            return jsonify({'status': 'error', 'message': f"Weather API error: {str(e)}"}), 503

        # 2. Process data
        stations = stations_res.json()
        weather = weather_res.json()
        
        madeira_stations = get_madeira_stations(stations)
        stations_data = organize_data_by_station(weather, madeira_stations)

        # Add defensive check for empty or malformed data
        if not any(data.get('readings') for data in stations_data.values()):
            app.logger.error("No readings available after sorting")
            return jsonify({'status': 'error', 'message': 'No time data available'}), 404

        # Add logging to check data structure
        for station_id, data in stations_data.items():
            if not data.get('readings'):
                app.logger.warning(f"Station {station_id} has no readings")

        stations_data = sort_data_by_time(stations_data)

        # Additional validation after sorting
        if not any(data.get('readings') for data in stations_data.values()):
            app.logger.error("No readings available after sorting")
            return jsonify({'status': 'error', 'message': 'No time data available'}), 404
        
        # 3. Add validation before ranking
        if not stations_data:
            return jsonify({'status': 'error', 'message': 'No station data available'}), 404
            
        rankings = rank_stations(stations_data, madeira_stations)

        # 4. Safe data formatting
        formatted_rankings = []
        for station in rankings:
            formatted_rankings.append({
                'id': station.get('station_id', 'N/A'),
                'name': station.get('station_name', 'Unknown Station'),
                'city': station.get('city', 'Unknown City'),
                'points': station.get('total_points', 0),
                'max_temp': station.get('max_temp', 0),
                'min_temp': station.get('min_temp', 0),
                'hours_above_20': station.get('metrics', {}).get('total_hours_above_20', 0),
                'wind_speed': station.get('metrics', {}).get('average_wind_speed', 0),
                'precipitation': station.get('last_precipitation', 0) or 0,
                'comfort_index': station.get('metrics', {}).get('comfort_index', 0),
                'warnings': station.get('warnings', [])
            })

        # 5. Get UV data
        uv_data = get_uv_index_data(uv_res.json())
        formatted_uv = []
        for location, uv_info in uv_data.items():
            formatted_uv.append({
                'location': location,
                'uv_index': uv_info.get('iUv', 'N/A'),
                'uv_time': uv_info.get('intervaloHora', 'N/A')
            })

        # 6. Get Weather warnings
        warnings = get_weather_warnings(warnings_res.json())
        formatted_warnings = []
        for location, warning in warnings.items():
            formatted_warnings.append({
                'location': location,
                'type': warning.get('awarenessTypeName', 'N/A'),
                'level': warning.get('awarenessLevelID', 'N/A'),
                'text': warning.get('text', 'N/A'),
                'start': warning.get('startTime', 'N/A'),
                'end': warning.get('endTime', 'N/A')
            })

        # 7. Get Sea data
        sea_data = get_sea_data(sea_res.json())
        formatted_sea = []
        for location, sea_info in sea_data.items():
            formatted_sea.append({
                'location': location,
                'sea_temp': sea_info.get('seaTemp', 'N/A'),
                'full_tide': sea_info.get('waveHighMax', 'N/A'),
                'low_tide': sea_info.get('waveHighMin', 'N/A')
            })

        # 8. Return data
        return jsonify({
            'status': 'empty' if not has_meaningful_data(formatted_rankings) else 'success',
            'last_updated': datetime.now().isoformat(),
            'rankings': formatted_rankings,
            'uv': formatted_uv,
            'warnings': formatted_warnings,
            'sea': formatted_sea
        })
        
    except Exception as e:
        app.logger.error(f"Server error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)