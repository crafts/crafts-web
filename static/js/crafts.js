$(function() {

   $.getJSON('/history.json', function(data) {
      $('#chart').highcharts('StockChart', {
         rangeSelector : {
            selected : 1,
            inputEnabled: $('#container').width() > 480
         },

         title : {
            text : 'CRAFTS Data'
         },

         series : [{
            name : 'AAPL',
            data : data,
            tooltip: {
               valueDecimals: 2
            }
         }]
      });
   });
});
