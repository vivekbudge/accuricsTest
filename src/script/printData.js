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
        let str = '';
        for (let [key, value] of map.entries()) {
            str += "<br> "+key +"&nbsp => &nbsp"+ value.length;
        }
        document.getElementById(id).innerHTML += str;
    }

    function printCarWithMoreCategory (map,id) {
        let str = '';
        for (let [key, value] of map.entries()) {
            if(value.length > 1) {
                str +="<br> "+key +"&nbsp => &nbsp"+ value.length;
            }
        }
        document.getElementById(id).innerHTML += str;
    }

    function printArrayOfObject (arrayOfObject,id) {
        let str = '';
        for(let obj in arrayOfObject) {
            str +="<br>"+JSON.stringify(arrayOfObject[obj]);
        }
        document.getElementById(id).innerHTML += str;
    }

    function printObject(modelPerMakeObject,id) {
        let str = '';
        for(let obj in modelPerMakeObject) {
            str +="<br>"+JSON.stringify(obj)+' => '+modelPerMakeObject[obj];
        }
        document.getElementById(id).innerHTML += str;
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
