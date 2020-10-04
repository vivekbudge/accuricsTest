    // parse all json and create maps useful for print data, charts & tables
    function getRequiredData (cars) {
        return new Promise(function(resolve, reject) {
        let carPerCategoryMap = new Map();
        let carPerYearMap = new Map();
        let carPerMakeMap = new Map();
        let categoryPerCarMap = new Map();
        // to store category arrays per yearmakeModel
        // key -> yearMakeModel
        // value -> respective categoryArray
        let yearMakeModelCategoryMap = new Map();
        // to store json object
        // key -> yearMakeModel
        // value -> {"year":"2013","make":"Acura","Model":"tx"}
        let yearMakeModelObjectMap = new Map();
        for(let category in cars){

                let carsPerCategoryArray = carPerCategoryMap.get(category);
                if(carsPerCategoryArray === undefined){
                    carsPerCategoryArray = new Array();
                }

              for(let year in cars[category]) {
                  let carsPerYearArray = carPerYearMap.get(year);
                  if(carsPerYearArray === undefined){
                      carsPerYearArray = new Array();
                  }

                  for(let make in cars[category][year]) {

                    let carsPerMakeArray = carPerMakeMap.get(make);
                    if(carsPerMakeArray === undefined){
                        carsPerMakeArray = new Array();
                    }

                    for(let model in cars[category][year][make]) {
                      let modelValue = cars[category][year][make][model];
                      carsPerYearArray.push(modelValue);
                      carsPerCategoryArray.push(modelValue);
                      carsPerMakeArray.push(modelValue);

                      //to set category per car
                      let categoryPerCarArray = categoryPerCarMap.get(modelValue);
                      if(categoryPerCarArray === undefined){
                          categoryPerCarArray = new Array();
                      }
                      categoryPerCarArray.push(category);
                      categoryPerCarArray = [...new Set(categoryPerCarArray)];
                      categoryPerCarMap.set(modelValue,categoryPerCarArray);

                      //to get json object, two map with same key , one having partial object & have category array
                      let yearMakeModel = year+make+modelValue;
                      let categoryArray = yearMakeModelCategoryMap.get(yearMakeModel);
                      if(categoryArray === undefined){
                        categoryArray = new Array();
                      }
                      categoryArray.push(category);
                      categoryArray = [...new Set(categoryArray)];
                      //storing array with same key
                      yearMakeModelCategoryMap.set(yearMakeModel,categoryArray);

                      // storing object using same key
                      let yearMakeModelObject = {
                        "Year" : year,
                        "Make" : make,
                        "Model": modelValue
                      };
                     yearMakeModelObjectMap.set(yearMakeModel,yearMakeModelObject);
                    }
                    carsPerMakeArray = [...new Set(carsPerMakeArray)];
                    carPerMakeMap.set(make,carsPerMakeArray);
                  }
                  carsPerYearArray = [...new Set(carsPerYearArray)];
                  carPerYearMap.set(year,carsPerYearArray);
              }
              carsPerCategoryArray = [...new Set(carsPerCategoryArray)];
              carPerCategoryMap.set(category,carsPerCategoryArray);
          }

          resolve([carPerYearMap,carPerCategoryMap,carPerMakeMap,categoryPerCarMap,
                yearMakeModelCategoryMap,yearMakeModelObjectMap]);
        });
    }

    // return category-make => model map
    // e.g 0: {"Sedan-Acura" => Array(8)}
    //       key: "Sedan-Acura"
    //       value: (8) [1, 1, 0, 0, 0, 1, 0, 2]
    // require for group bar chart & sunburst chart
    function getChartData(yearMakeModelCategoryMap,yearMakeModelObjectMap,yearsArray) {
        let categoryMakePerYearDataMap = new Map();
        for(let [key, yearMakeModelObject] of yearMakeModelObjectMap.entries()){
            let categoryArray = yearMakeModelCategoryMap.get(key);
            for(let i in categoryArray){
                let categoryPerMake = categoryArray[i] + '-' +yearMakeModelObject.Make;
                let dataArray = categoryMakePerYearDataMap.get(categoryPerMake);
                if(dataArray === undefined) {
                    dataArray = new Array(yearsArray.length);
                    dataArray.fill(0);
                }
                let yearIndex = yearsArray.indexOf(yearMakeModelObject.Year);
                dataArray[yearIndex] = dataArray[yearIndex] + 1 ;
                categoryMakePerYearDataMap.set(categoryPerMake,dataArray);
            }
        }
        //console.log(categoryMakePerYearDataMap);
        //console.log(yearsArray);
        return categoryMakePerYearDataMap;
    }

    function getTableRows(yearMakeModelCategoryMap,yearMakeModelObjectMap) {
        let tableRows = new Array();
        for(let [key,yearMakeModelObj] of yearMakeModelObjectMap.entries()){
            let categoryArray = yearMakeModelCategoryMap.get(key);
            for (let i in categoryArray) {
                let row  = [];
                row.push(yearMakeModelObj.Make);
                row.push(yearMakeModelObj.Model);
                row.push(categoryArray[i]);
                tableRows.push(row);
            }
        }
        return tableRows;
    }