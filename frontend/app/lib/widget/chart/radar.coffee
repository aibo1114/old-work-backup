module.exports =
    fun: (d, id)->
        cf.loadJS cf.rPath + "js/amcharts/amcharts.js", ->
            cf.loadJS cf.rPath + "js/amcharts/radar.js", ->
                chart = new AmCharts.AmRadarChart()
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
                    graphs: [
                        balloonText: "[[val]]项目评估",
                        bullet: "round",
                        valueField: "val"
                        title: '主持经历综合数据'
                    ,
                        balloonText: "[[value]]项目评估",
                        bullet: "round",
                        valueField: "v"
                        title: 'PET主持人平均水平'
                    ]
                    categoryField: 'title'


                if cf.mob
#                    chart.labelRadius = -30;
                    chart.labelText = "[[percents]]%";
                    legend = new AmCharts.AmLegend();
                    legend.align = "center";
                    legend.markerType = "circle";
#                    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
                    chart.addLegend(legend);

                chart.write(id)