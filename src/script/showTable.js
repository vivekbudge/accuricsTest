
    function showTable(table,tableRows) {
        generateTable(table, tableRows,'');
    }

    function showFilteredTable(table,tableRows,filterString){
        deleteAllRows(table);
        generateTable(table, tableRows,filterString.toUpperCase());
    }

    function generateTable(table, tableRows,filterString) {
        for (let rowIndex in tableRows) {
            let row = table.insertRow();
            let rowLength = table.rows.length;
            let found = false;
            for (let cellIndex in tableRows[rowIndex]) {
                let cell;
                let text;
                if(cellIndex == 0){
                    // adding serial number cell
                    cell = row.insertCell(0);
                    // as first row will be table header, that's why rowLength-1
                    text = document.createTextNode(rowLength-1);
                    cell.appendChild(text);
                }
                cell = row.insertCell(parseInt(cellIndex)+1);
                let cellValue = tableRows[rowIndex][cellIndex];

                if(!found && cellValue.toUpperCase().indexOf(filterString) > -1){
                    found = true;
                }

                text = document.createTextNode(cellValue);
                cell.appendChild(text);
            }

            if(!found){
                // as indexing start from 0 ..so deleting last added row as search wont matches
                table.deleteRow(rowLength-1);
            }
        }
    }

    function deleteAllRows(table) {
        let l = table.rows.length;
        for(let i =1 ;i<l;i++){
            // at 0 table header so starting from 1
            table.deleteRow(1);
        }
    }