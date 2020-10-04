
    function showSunBurstChart (dataMap,allCategories,rootName) {
        let data = getSunBurstChartData(dataMap,allCategories,rootName);
        //console.log(data);
        Highcharts.getOptions().colors.splice(0, 0, 'transparent');
        Highcharts.chart('sunBurstChart', {

            chart: {
                height: '45%'
            },

            title: {
                text: 'Distribution of cars in each Make with Category'
            },
            series: [{
                type: "sunburst",
                data: data,
                allowDrillToNode: true,
                cursor: 'pointer',
                dataLabels: {
                    format: '{point.name}',
                    filter: {
                        property: 'innerArcLength',
                        operator: '>',
                        value: 16
                    },
                    rotationMode: 'circular'
                },
                levels: [{
                    level: 1,
                    levelIsConstant: false,
                    dataLabels: {
                        filter: {
                            property: 'outerArcLength',
                            operator: '>',
                            value: 64
                        }
                    }
                }, {
                    level: 2,
                    colorByPoint: true
                },
                {
                    level: 3,
                    colorVariation: {
                        key: 'brightness',
                        to: -0.5
                    }
                }]
            }],
            tooltip: {
                headerFormat: "",
                pointFormat: 'The number of cars in <b>{point.name}</b> is <b>{point.value}</b>'
            }
        });
    }

    function getSunBurstChartData(dataMap,allCategories,rootName) {
        let data = new Array();
        data.push(getRootLevelObject(rootName));

        let [secondLevelObjArray,categoryIdMap] = getSecondLevel (allCategories);
        data = data.concat(secondLevelObjArray);
        let leafLevelObjArray = getLeafLevel(categoryIdMap,dataMap);
        data = data.concat(leafLevelObjArray);
       // console.log(data);
        return data;
    }

    // dataMap have category-make => model map
    // e.g 0: {"Sedan-Acura" => Array(8)}
    //       key: "Sedan-Acura"
    //       value: (8) [1, 1, 0, 0, 0, 1, 0, 2]  -> by taking sum of this will total cars across all years
    // require for group bar chart & sunburst chart
    function getLeafLevel(categoryIdMap,dataMap) {
        let leafLevelObjArray = new Array();
        let itr = 0;
        for(let [category_make,yearWiseCars] of dataMap) {
            let numberOfCar = 0;
            for(let i in yearWiseCars){
                // number of cars across all years for same make and category
                numberOfCar += yearWiseCars[i];
            }
            let [category,make] =  category_make.split("-");
            let parentId = categoryIdMap.get(category);

            let obj = {
                'id': '2.' + itr++,
                'parent': parentId,
                'name': make,
                'value': numberOfCar
            }
            leafLevelObjArray.push(obj);
        }
        return leafLevelObjArray;
    }

    function getSecondLevel (allCategories) {
        // for next levels parentIDs
        let categoryIdMap = new Map();
        let secondLevelObjArray = new Array();
        for(let i in allCategories) {
            let obj = {
                'id': '1.' + i,
                'parent': '0.0',
                'name': allCategories[i]
            }
            secondLevelObjArray.push(obj);
            categoryIdMap.set(allCategories[i],obj.id);
        }
        return [secondLevelObjArray,categoryIdMap];
    }

    function getRootLevelObject(rootName) {
        let obj = {
            'id': '0.0',
            'parent': '',
            'name': rootName
        }
        return obj;
    }