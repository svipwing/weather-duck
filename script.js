$(document).ready(function() {
  var key = "和风天气API KEY";
  
  $("#now").text(new Date().getFullYear());
    
  $('#searchBtn').click(function() {
    var cityName = $('#cityInput').val().trim();
    if (cityName !== '') {
      var url = 'https://geoapi.qweather.com/v2/city/lookup?location=' + cityName + '&key=' + key;
      $.get(url, function(data) {
        if (data.code === '200') {
          var cities = data.location;
          var resultHtml = '<ul>';
          $.each(cities, function(index, city) {
            resultHtml += '<li><a href="#" class="cityLink" data-id="' + city.id + '">' + city.name + '</a></li>';
          });
          resultHtml += '</ul>';
          $('#resultContainer').html(resultHtml);
        } else {
          $('#resultContainer').html('未找到相关城市');
        }
      });
    }
  });

  $(document).on('click', '.cityLink', function(e) {
    e.preventDefault();
    var cityId = $(this).data('id');
    var cityName = $(this).text();
    var weatherUrl = 'https://devapi.qweather.com/v7/weather/now?location=' + cityId + '&key=' + key;
    $.get(weatherUrl, function(data) {
      if (data.code === '200') {
        var weather = data.now;
        var weatherHtml = '<h2>' + cityName + ' 实时天气</h2>';
        //2024-04-23T14:25+08:00
        weatherHtml += '<p>观测时间：' + weather.obsTime.substring(0,16).replace("T"," ") + '</p>';
        weatherHtml += '<p>温度：' + weather.temp + '°C</p>';
        weatherHtml += '<p>体感温度：' + weather.feelsLike + '°C</p>';
        weatherHtml += '<p>天气状况：' + weather.text + '</p>';
        weatherHtml += '<p>风向：' + weather.windDir + '</p>';
        weatherHtml += '<p>风速：' + weather.windSpeed + ' km/h</p>';
        weatherHtml += '<p>相对湿度：' + weather.humidity + '%</p>';
        weatherHtml += '<p>降水量：' + weather.precip + '毫米</p>';
        weatherHtml += '<p>大气压强：' + weather.pressure + '百帕</p>';
        weatherHtml += '<p>能见度：' + weather.vis + '公里</p>';
        $('#resultContainer').html(weatherHtml);
      } else {
        $('#resultContainer').html('未找到该城市的天气信息');
      }
    });
  });
});