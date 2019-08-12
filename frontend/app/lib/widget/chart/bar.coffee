module.exports =
    fun: (d, id)->
        cf.loadJS cf.rPath + "js/amcharts/amcharts.js", ->
            cf.loadJS cf.rPath + "js/amcharts/serial.js", ->
                chart = new AmCharts.AmSerialChart();
                chart.dataProvider = d;
                chart.categoryField = "title";
                chart.rotate = true;

                valueAxis = new AmCharts.ValueAxis();
                valueAxis.title = "综合评分与对比";
                valueAxis.gridAlpha = 0.1;
                chart.addValueAxis(valueAxis);

                graph = new AmCharts.AmGraph();
                graph.title = "分数";
                graph.valueField = "val";
                graph.type = "column";
                graph.balloonText = "[[category]]:[[value]]";
                graph.lineAlpha = 0;
                graph.fillColors = "#bf1c25";
                graph.fillAlphas = 1;
                chart.addGraph(graph);

                chart.creditsPosition = "top-right";

                chart.write(id)