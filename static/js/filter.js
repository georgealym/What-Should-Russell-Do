d3.request(queryUrl).get(data => {
  data = JSON.parse(data.response)
  var tableData = data;
  
  var table = d3.select("tbody");
  function buildtable(data) {
      table.html("");
      data.forEach((filter) => {
          var rowinfo = table.append("tr");
          Object.entries(filter).forEach(([key, value]) => {
            var cell = rowinfo.append("td");
            cell.text(value);
          });
  });
  }
  buildtable(tableData) 

  
//create a function for multple filters to take the input and find the data associated with it
function multiplefilter() {
  //select the use input
  var element = d3.select(this).select("input");
  //find the value associated with the input 
  var item = element.property("value");
  var id = element.attr("id");
  //if the value matches the filter id in the table, show only that information and do not show the other information matching with it 
  if (item) {
    filters[id] = item;
  }
  else {
    delete filters[id];
  }
  //when you click the button
  buttonclick();
}


//add a function for when you click the button 
function buttonclick(){
    d3.event.preventDefault();
    //create variables using the user input from the filtered data
    var filtered = tableData;
    //uses the entries from the different filters to determine what to search for using the keys and values 
    Object.entries(filters).forEach(([key, value]) => {
      if(key == "Zip Code" | key == "Rating"){
        filtered = filtered.filter(row => row[key] === parseInt(value))
      } else{
        filtered = filtered.filter(row => row[key] === value)
      }
    });
      //build a new table depending on the filtered data - if the user input does not match any of the existing data
    //it will return a blank table
      buildtable(filtered);
  };
  //uses d3 on the class of the button in the HTML to run this function when the button is clicked on 
  //the webpage
  d3.selectAll("#filter-btn").on("click", buttonclick);
  //uses d3 to change the filter 
  d3.selectAll(".filter").on("change", multiplefilter);


  
  function onClick(e) {
    console.log(e);
    console.log(e.target.customName)
    
    d3.request(queryUrl).get(data => {
      
      data = JSON.parse(data.response)
      var tableData = data;
      tableData = tableData.filter(row => row.Name === e.target.customName)
      buildtable(tableData)
    })
  }

});
