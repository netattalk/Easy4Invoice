function dropdownInput(){		//Generate Dropdown for Input fields

	var count = parseInt(localStorage.getItem("count"));

	//all Fields wich get Dropdown
	var header = {
		customer0:			"1",
		invoicenr: 			"1",
		customernr:			"1",
		invoicedate:		"1",
		paymenttarget:		"1"
		};

	var data = new Array;

var dropdown;
var key;
var option, searchOpt;
var val;
var i;

var search = document.createElement("datalist");
search.setAttribute("id", "datalist_search");
document.body.appendChild(search);


	for (key in header) {
		i = 0;
		dropdown = "";
		option = "";

		dropdown = document.createElement("datalist");
		dropdown.setAttribute("id", "datalist_" + key );
		document.body.appendChild(dropdown);
		val = "";

		while (i <= count){
			if (localStorage.getItem(key + "_" + i) != null && localStorage.getItem(key + "_" + i) != " ") {
				data[i] = localStorage.getItem(key + "_" + i);
			}
		i++;
		}
		data = unique(data);
		for (val in data){
			searchOpt = document.createElement("option");
			option = document.createElement("option");
			option.value = data[val];
			searchOpt.value = data[val];
			dropdown.append(option);
			search.append(searchOpt);
		}

	}

}

function unique(ain) {		//Check Array for mutliple values
  var seen = {}
  var aout = []

  for (var i = 0; i < ain.length; i++) {
    var elt = ain[i]
    if (!seen[elt]) {
      aout.push(elt)
      seen[elt] = true
    }
  }

  return aout
}


$(function() {	//Search with Enter button
        $('#searchhistory').keypress(function(e) {
            if(e.which == 10 || e.which == 13) {
                arraySearch();
            }
        });

});

$(function() {		//Customer known ? if so we get the last values of this costumer
	var line;
	$('#customer0').change(function (e) {
		var customer = document.getElementById("customer0").value;
		console.log(customer);
		line = customerSearch(customer);

		// TODO function to verify and change customer address

		if (line != null && line >= 0){
			fillCustomer(line);
		}
	});

});

function fillCustomer(line){	//Fill in informations

			document.getElementById("customer0").value = localStorage.getItem("customer0_" + line);
			document.getElementById("customer1").value = localStorage.getItem("customer1_" + line);
			document.getElementById("customer2").value = localStorage.getItem("customer2_" + line);
			document.getElementById("customer3").value = localStorage.getItem("customer3_" + line);
			document.getElementById("customer4").value = localStorage.getItem("customer4_" + line);
			document.getElementById("customer5").value = localStorage.getItem("customer5_" + line);

}



function customerSearch(text){			//Search Customer Local Storage, best ot use with Dropdown funktion

	var count;
	var search = {
		customer0: 			"1"
		};

	var i = 1;
	var data = new Array;
	var line, key;

	for (key in search){
		count = parseInt(localStorage.getItem("count"));
		while (count >= i){
			data[count] = localStorage.getItem(key + "_" + count);
			count--;
			line = data.indexOf(text);
			if (line >= 0){

				return line;
			}
		}
	}
}

function arraySearch(field){			//Searchbar for Input fields

	var text = document.getElementById("searchhistory").value;
	if (text == ""){
		document.getElementById("searchhistory").placeholder = "eingabe fehlt";
		return;
	}
	var count;
	var search = {
		customer0: 			"1",
		invoicenr: 			"1",
		customernr:			"1",
		invoicedate:		"1",
		paymenttarget:		"1"
		};

	var i = 1;
	var data = new Array;
	var line, key;

	for (key in search){
		count = parseInt(localStorage.getItem("count"));
		while (count >= i){
			data[count] = localStorage.getItem(key + "_" + count);
			count--;
			line = data.indexOf(text);
			if (line >= 0){

				loadStorageolder(line);
				document.getElementById("searchhistory").value = "";
				document.getElementById("searchhistory").placeholder= text;
				return;			// First hit will be Loaded

			}
		}

	}		//If nothing is found we do nothing
	document.getElementById("searchhistory").value = "";
	document.getElementById("searchhistory").placeholder = "Keine Ergebnisse.";
}
