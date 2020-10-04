
    function showBarChart (dataMap,years) {
        let seriesData = getBarChartSeriesData(dataMap);
        document.addEventListener('DOMContentLoaded', function () {
                let myChart = Highcharts.chart('groupBarChart', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Distribution of number of cars in each Category per Make year-wise'
                    },
                    xAxis: {
                        categories: years,
                        title: {
                            text: 'Years'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of cars'
                        }
                    },
                    series: seriesData
                });
            });
    }

    function getBarChartSeriesData (dataMap) {
        let seriesDataArray = new Array();
        let colorsArray = ['BlueViolet','Aqua','Brown','Chartreuse','Chocolate','DarkBlue','DarkGoldenRod',
                            'DarkCyan','DarkOrange','DarkRed','DeepPink','ForestGreen','FireBrick','Green',
                            'DarkMagenta'];

        let i = 0;
        let colorsArrayLength = colorsArray.length;
        for (let [category_make, yearWiseData] of dataMap.entries()) {
            //console.log(colorsArray[i++ % colorsArrayLength] + '->'+category_make);
            let series = {
                "name" : category_make,
                "data" : yearWiseData,
                "color": colorsArray[i++ % colorsArrayLength]
            }
            seriesDataArray.push(series);
        }
        return seriesDataArray;
    }