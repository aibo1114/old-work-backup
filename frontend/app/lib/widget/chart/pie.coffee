module.exports =
    fun: (d, id)->
        cf.loadJS cf.rPath + "js/amcharts/amcharts.js", ->
            cf.loadJS cf.rPath + "js/amcharts/pie.js", ->
                chart = new AmCharts.AmPieChart()
                $.extend chart,
                    dataProvider: d
                    titleField: "title"
                    valueField: "value"
                    outlineColor: "#fff"
                    outlineAlpha: 0.8
                    outlineThickness: 2
                    balloonText: "[[title]]<br/><span style='font-size:14px'><b>[[value]]人</b> ([[percents]]%)</span>"
                    depth3D: 15
                    angle: 30
                if cf.mob
                    chart.labelRadius = -30;
                    chart.labelText = "[[percents]]%";
                    legend = new AmCharts.AmLegend();
                    legend.align = "center";
                    legend.markerType = "circle";
                    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
                    chart.addLegend(legend);

                chart.write(id)