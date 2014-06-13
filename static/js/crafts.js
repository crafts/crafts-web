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
            inputEnabled: true,
            buttons: [{
               type: 'day',
               count: 1,
               text: '1d'
            }, {
               type: 'week',
               count: 1,
               text: '1w'
            }, {
               type: 'month',
               count: 1,
               text: '1m'
            }, {
               type: 'all',
               text: 'All'
            }]
         },
         title : {
            text : 'CRAFTS Data'
         },
         yAxis: {
            floor: 0
         },
         series : seriesData
      });
   }
});
