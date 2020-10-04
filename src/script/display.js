
    getRequiredData(cars).
        then(function ([carPerYearMap,carPerCategoryMap,carPerMakeMap,categoryPerCarMap,
            yearMakeModelCategoryMap,yearMakeModelObjectMap]) {

            printData(carPerYearMap,carPerCategoryMap,carPerMakeMap,categoryPerCarMap,
                yearMakeModelCategoryMap,yearMakeModelObjectMap);

            //for bar chart x axis
            let yearsArray = [...carPerYearMap.keys()];
            yearsArray.sort();

            // for sunburst chart level 2
            let allCategories = [...carPerCategoryMap.keys()];
            showCharts(yearMakeModelCategoryMap,yearMakeModelObjectMap,yearsArray,allCategories);

            allTableRows = getTableRows(yearMakeModelCategoryMap,yearMakeModelObjectMap);
            let table = document.getElementById("makeModelCatTableId");
            showTable(table,allTableRows);
        }).
        catch(function () {
            document.write('Some error has occurred');
        });

    function showCharts(yearMakeModelCategoryMap,yearMakeModelObjectMap,yearsArray,allCategories) {
        let chartDataMap = getChartData(yearMakeModelCategoryMap,yearMakeModelObjectMap,yearsArray);
        showBarChart(chartDataMap,yearsArray);

        showSunBurstChart(chartDataMap,allCategories,'Cars');
    }

    function showSearchTableResult(){
        let table = document.getElementById("makeModelCatTableId");
        let searchValue = document.getElementById("searchBox").value;
        showFilteredTable(table,allTableRows,searchValue);
    }