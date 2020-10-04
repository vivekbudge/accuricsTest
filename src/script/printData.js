    function printData(carPerYearMap,carPerCategoryMap,carPerMakeMap,categoryPerCarMap,
        yearMakeModelCategoryMap,yearMakeModelObjectMap) {
        printNumberPerType(carPerYearMap,"printCarPerYear");
        printNumberPerType(carPerCategoryMap,"printCarPerCategory");
        printNumberPerType(carPerMakeMap,"printCarPerMake");
        printCarWithMoreCategory(categoryPerCarMap,"printCarWithMoreCategory");

        let yearMakeModelCategoryArrayObject = getYearMakeModelCategoryArrayObject(yearMakeModelCategoryMap,yearMakeModelObjectMap);
        printArrayOfObject(yearMakeModelCategoryArrayObject,"printArray");

        let modelPerMakeObject = getModelPerMakeObject(carPerMakeMap);
        printObject(modelPerMakeObject,"printObject");
    }

    function printNumberPerType (map,id) {
        for (let [key, value] of map.entries()) {
            document.getElementById(id).innerHTML +=
                "<br> "+key +"&nbsp => &nbsp"+ value.length;
        }
    }

    function printCarWithMoreCategory (map,id) {
        for (let [key, value] of map.entries()) {
            if(value.length > 1) {
                document.getElementById(id).innerHTML +=
                    "<br> "+key +"&nbsp => &nbsp"+ value.length;
            }
        }
    }

    function printArrayOfObject (arrayOfObject,id) {
        for(let obj in arrayOfObject) {
            document.getElementById(id).innerHTML +=
                "<br>"+JSON.stringify(arrayOfObject[obj]);
        }
    }

    function printObject(modelPerMakeObject,id) {
        for(let obj in modelPerMakeObject) {
            document.getElementById(id).innerHTML +=
                "<br>"+JSON.stringify(obj)+' => '+modelPerMakeObject[obj];
        }
    }

    function getYearMakeModelCategoryArrayObject (yearMakeModelCategoryMap,yearMakeModelObjectMap) {
        let yearMakeModelCategoryArray = new Array();
        for (let [key, value] of yearMakeModelObjectMap.entries()) {
          value.Category = (yearMakeModelCategoryMap.get(key)).join();
          yearMakeModelCategoryArray.push(value);
        }
        return yearMakeModelCategoryArray;
    }

    function getModelPerMakeObject (carPerMakeMap) {
        let modelPerMakeObject = {};
        for (let [key, value] of carPerMakeMap.entries()) {
            modelPerMakeObject[key] = value;
        }
        return modelPerMakeObject;
    }