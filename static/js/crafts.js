$(function() {
   seriesData = []

   $.getJSON('/aggregates?role=arts', function(data) {
      seriesData.push({
         name : 'Samples',
         data : data,
         tooltip: {
            valueDecimals: 0
         }
      });
   });

   $.getJSON('/predictions?role=arts', function(data) {
      seriesData.push({
         name : 'Predictions',
         data : data,
         tooltip: {
            valueDecimals: 0
         }
      });

      createChart();
   });

   function createChart() {
      $('#chart').highcharts('StockChart', {
         rangeSelector : {
            selected : 1,
            inputEnabled: $('#container').width() > 480
         },
         title : {
            text : 'CRAFTS Data'
         },
         series : seriesData
      });
   }
});
