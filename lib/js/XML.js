function buildCache(){	//Get XML File and prepare for input

var folder = document.getElementById("myInput");

  var files = folder.files,
      len = files.length,
      i;
  for(i=0;i<len;i+=1){

	reader = new FileReader();
	waitForTextReadComplete(reader);
    reader.readAsText(files[i]);
}
location.reload();
}


function waitForTextReadComplete(reader) {	//Read XML files
    reader.onloadend = function(event) {
        var text = event.target.result;

        parseTextAsXml(text);
    }
}

function parseTextAsXml(text) {		//Informations of XML to LocalStorage



	var key;
    var parser = new DOMParser(),
        xmlDom = parser.parseFromString(text, "text/xml");
		// get Numbers of Rows
	var colums = 			xmlDom.getElementsByTagName("colums")[0].childNodes[0].nodeValue;

	if(xmlDom.getElementsByTagName("prcdiscount")[0].childNodes[0].nodeValue == ""){

	}

//HEADER Tags from XML File
	var header = {
		head: 				"",
		invoicenr: 			"",
		customernr:			"",
		invoicedate:		"",
		paymenttarget:		"",
		IBAN:		 		"",
		rechnungssteller:	"",
		header0:			"",
		header1:			"",
		header2:			"",
		header3:			"",
		header4:			"",
		table0:				"",
		table1:				"",
		table2:				"",
		table3:				"",
		table4:				"",
		notizen: 			"",
		notesOverTable:		"",
		customer0: 			"",
		customer1: 			"",
		customer2: 			"",
		customer3: 			"",
		customer4: 			"",
		customer5: 			"",
		notizen:			""
	};

	key = "";
	//Fehlt ein Tag in den XML Files, wird ein alert getriggert, die Daten werden Trotzdem geladen
	//Missing informations will be shown by an alert and Tag name (All other Informations will be added to the localStorage)
	for(key in header)	{
		try {
			header[key] = xmlDom.getElementsByTagName(key)[0].childNodes[0].nodeValue
		}

		catch(err){
			alert("error on:" + key)
			err = "";
		}
	}


key = "";
var count;
if(localStorage.getItem("count") != null){
	count = parseInt(localStorage.getItem("count"));
	count = count + 1;
}
else{
	count = 1;
}



localStorage.setItem("count", count);
for (key in header){
	localStorage.setItem(key + "_" + count, header[key]);
}

localStorage.setItem("rows_" + count, colums);

var val;
var i = 0;
while (i < colums){
		//ROWS wich will be loaded from the XML file
	var data = {
		item: 					"",
		description: 			"",
		qty: 					"",
		cost: 					"",
		prcdiscount:			""
		};

	for (val in data){
		try {
			data[val] = xmlDom.getElementsByTagName(val)[i].childNodes[0].nodeValue;
		}
		catch(err){
			alert("error beim Einlesen der Daten");
			err = "";
		}
	}
	val = "";

	for (val in data){
		localStorage.setItem(val + "_" + count + "_" + i, data[val]);
		if (localStorage.getItem(val + "_" + count + "_" + i) == " "){
			localStorage.removeItem(val + "_" + count + "_" + i);
		}
	}

	i++;
}




}
