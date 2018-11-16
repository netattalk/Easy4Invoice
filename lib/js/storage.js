

//***********************************************************
//3 Arrays need to be Changed for LocalStorage Save and Load
//***********************************************************

$('document').ready(function(){

var count = localStorage.getItem("count");

if(count=="undefined"){
	count = 1;
}
loadStorage(count);
dropdownInput();

	//**************************************************************//
	//after upload get new Logo at the Top of the Page              //
	//**************************************************************//

	window.addEventListener('load', function() {
  document.querySelector('input[id="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');
          img.src = URL.createObjectURL(this.files[0]);
      }
  });
});

});

$("#tablebody").sortable({		//Table Rows Drag and Droppable
	update: function() {validatePos();}		//Get new Position numbers
});



function loadStorage(val){			//Load from Storage at page load
count = val;

// Array for fields to Load at startup	ATTENTION: Input fields need to be loaded in Header (.value) and Text fields need to be loaded in headerHMTL (.innerHTML)
var header = {
	invoicenr: 			document.getElementById("invoicenr").value,
	customernr:			document.getElementById("customernr").value,
	invoicedate:		document.getElementById("invoicedate").value,
	paymenttarget:		document.getElementById("paymenttarget").value,
	IBAN:		 		document.getElementById("IBAN").value,
	customer0:			document.getElementById("customer0").value,
	customer1:			document.getElementById("customer1").value,
	customer2:			document.getElementById("customer2").value,
	customer3:			document.getElementById("customer3").value,
	customer4:			document.getElementById("customer4").value
};
//Header for innerHTML fields
var headerHtml = {
	notesOverTable:		document.getElementById("notesOverTable").innerHTML,
	head:				document.getElementById("head").innerHTML,
	rechnungssteller:	document.getElementById("rechnungssteller").innerHTML,
	header0:			document.getElementById("header0").innerHTML,
	header1:			document.getElementById("header1").innerHTML,
	header2:			document.getElementById("header2").innerHTML,
	header3:			document.getElementById("header3").innerHTML,
	header4:			document.getElementById("header4").innerHTML,
	table0:				document.getElementById("table0").innerHTML,
	table1:				document.getElementById("table1").innerHTML,
	table2:				document.getElementById("table2").innerHTML,
	table3:				document.getElementById("table3").innerHTML,
	table4:				document.getElementById("table4").innerHTML,
	notizen:			document.getElementById("notizen").innerHTML
};
//Set Defaults for every Header (use " " for no default)
var defaulttable = {
	head:				"Rechnung/Angebot",
	rechnungssteller:	"net@talk GmbH Johannisstr. 24 D-84034 Landshut",
	header0:			"Rechnungsnr.:",
	header1:			"Kundennr.:",
	header2:			"Datum:",
	header3:			"Zahlungsziel:",
	header4:			"Bankverbindung",
	table0:				"Position",
	table1:				"Artikel",
	table2:				"Menge",
	table3:				"Einzelpreis",
	table4:				"Gesamtpreis",
	notizen:			"Notizen",
	notesOverTable:		"Amtsgericht, UmSt:"
};


var rowsold = localStorage.getItem("rows_"+count);
localStorage.setItem("view", count);

//Show number of view
document.getElementById("countInvoices").innerHTML = "Verlauf: " + count;


//Delete all Rows
var rows = getAllRows();
var num = rows.length;

while (num > 0){
		num--;
	deleteRow(rows[num])

}

var i = 0;

//make all Rows from LocalStorage
while (rowsold > i){
	addTable(+1);
	i++;

}
rows = "";
rows = getAllRows();
num = rows.length;


var key = "";
i = 0;

//Fill in informations of rows
while (i < num){

	var data = {
		item:				document.getElementById("item_"+rows[i]).value,
		description:		document.getElementById("description_"+rows[i]).value,
		qty:				document.getElementById("qty_"+rows[i]).value,
		cost:				document.getElementById("cost_"+rows[i]).value,
		prcdiscount:		document.getElementById("prcdiscount_"+rows[i]).value
	}

	key = "";

	for (key in data){

		if(localStorage.getItem(key + "_" + count + "_" + i) != null){
			document.getElementById(key+"_"+rows[i]).value = localStorage.getItem(key + "_" + count + "_" + i);
		}
		if(key == "prcdiscount"){
			if (localStorage.getItem("prcdiscount_" + count + "_" + i) != "" && localStorage.getItem("prcdiscount_" + count + "_" + i) != null){
				noDiscount("yes",rows[i]);
				document.getElementById("discountv_" + rows[i]).value = localStorage.getItem(key + "_" * count + "_" + i)
				document.getElementById("prcdiscount_" + rows[i]).value = localStorage.getItem(key + "_" + count + "_" + i)
			}
	}
}

	calculate("this", rows[i]);			//Calculate each row
	i++;
}

	 key = "";
	for (key in header){
		if (localStorage.getItem(key + "_" + count) != null && localStorage.getItem(key + "_" + count) != " "){
				document.getElementById(key).value = localStorage.getItem(key + "_" + count);
		}
	}
	key = "";
	for (key in headerHtml){
		if (localStorage.getItem(key + "_" + count) != null && localStorage.getItem(key + "_" + count) != ""){
			document.getElementById(key).innerHTML = localStorage.getItem(key + "_" + count);
		}
		else{
			document.getElementById(key).innerHTML = defaulttable[key];
		}
	}

}




function loadStorageolder(val){				//load older Invoice of LocalStorage (val = number of Invoice in LocalStorage)
document.getElementById("minus").style.cursor = "wait";
document.getElementById("plus").style.cursor = "wait";

// Array for fields to Load at startup	ATTENTION: Input fields need to be loaded in Header (.value) and Text fields need to be loaded in headerHMTL (.innerHTML)
var header = {
	invoicenr: 			document.getElementById("invoicenr").value,
	customernr:			document.getElementById("customernr").value,
	invoicedate:		document.getElementById("invoicedate").value,
	paymenttarget:		document.getElementById("paymenttarget").value,
	IBAN:		 		document.getElementById("IBAN").value,
	customer0:			document.getElementById("customer0").value,
	customer1:			document.getElementById("customer1").value,
	customer2:			document.getElementById("customer2").value,
	customer3:			document.getElementById("customer3").value,
	customer4:			document.getElementById("customer4").value
};
//Header for innerHTML fields
var headerHtml = {
	notesOverTable:		document.getElementById("notesOverTable").innerHTML,
	head:				document.getElementById("head").innerHTML,
	rechnungssteller:	document.getElementById("rechnungssteller").innerHTML,
	header0:			document.getElementById("header0").innerHTML,
	header1:			document.getElementById("header1").innerHTML,
	header2:			document.getElementById("header2").innerHTML,
	header3:			document.getElementById("header3").innerHTML,
	header4:			document.getElementById("header4").innerHTML,
	table0:				document.getElementById("table0").innerHTML,
	table1:				document.getElementById("table1").innerHTML,
	table2:				document.getElementById("table2").innerHTML,
	table3:				document.getElementById("table3").innerHTML,
	table4:				document.getElementById("table4").innerHTML,
	notizen:			document.getElementById("notizen").innerHTML
};
//Set Defaults for every Header (use " " for no default)
var defaulttable = {
	head:				"Rechnung/Angebot",
	rechnungssteller:	"net@talk GmbH Johannisstr. 24 D-84034 Landshut",
	header0:			"Rechnungsnr.:",
	header1:			"Kundennr.:",
	header2:			"Datum:",
	header3:			"Zahlungsziel:",
	header4:			"Bankverbindung",
	table0:				"Position",
	table1:				"Artikel",
	table2:				"Menge",
	table3:				"Einzelpreis",
	table4:				"Gesamtpreis",
	notizen:			"Notizen",
	notesOverTable:		"Amtsgericht, UmSt:"
};

count = val;
var max = parseInt(localStorage.getItem("count"));
if (count > max++){
	count = max++;
}
else if (count <= 0 || count == "undefined"){
	count = 1;
}



var key = "";
for (key in header){
	if (localStorage.getItem(key + "_" + count) != null && localStorage.getItem(key + "_" + count) != " "){
		document.getElementById(key).value = localStorage.getItem(key + "_" + count);
	}
	else{
		document.getElementById(key).value = null;
	}
}
key = "";
for (key in headerHtml){
	if (localStorage.getItem(key + "_" + count) != null && localStorage.getItem(key + "_" + count) != ""){
		document.getElementById(key).innerHTML = localStorage.getItem(key + "_" + count);
	}
	else{
		document.getElementById(key).innerHTML = defaulttable[key];
	}
}


var rowsold = localStorage.getItem("rows_"+count);

localStorage.setItem("view", parseInt(count));

document.getElementById("countInvoices").innerHTML = "Verlauf: " + count;


//Delete all Rows
var rows = getAllRows();
var num = rows.length;

while (num > 0){
		num--;
	deleteRow(rows[num])

}

var i = 0;

//make all Rows from LocalStorage
while (rowsold > i){
	addTable(+1);
	i++;

}
rows = getAllRows();
num = rows.length;


i = 0;
//Fill in informations of rows
while (i < num){

	document.getElementById("item_" + rows[i]).value = localStorage.getItem("item_" + count + "_" + i)
	document.getElementById("description_" + rows[i]).value = localStorage.getItem("description_" + count + "_" + i)
	document.getElementById("qty_" + rows[i]).value = localStorage.getItem("qty_" + count + "_" + i)
	document.getElementById("cost_" + rows[i]).value = localStorage.getItem("cost_" + count + "_" + i)
	if (localStorage.getItem("prcdiscount_" + count + "_" + i) != "" && localStorage.getItem("prcdiscount_" + count + "_" + i) != null){
		noDiscount("yes",rows[i]);
		document.getElementById("discountv_" + rows[i]).value = localStorage.getItem("prcdiscount_"+ count + "_" + i)
		document.getElementById("prcdiscount_" + rows[i]).value = localStorage.getItem("prcdiscount_"+ count + "_" + i)

	}
	calculate("this", rows[i]);
	i++;
}

var i1 = 1;

document.getElementById("minus").style.cursor = "pointer";
document.getElementById("plus").style.cursor = "pointer";
 $(":input").attr("disabled", false);
}





function makeInvoice() {			//make XML and Save everything to LocalStorage


document.getElementById("submit_invoice").style.cursor = "wait";

// Array for fields to Load at startup	ATTENTION: Input fields need to be loaded in Header (.value) and Text fields need to be loaded in headerHMTL (.innerHTML)
var header = {
	invoicenr: 			document.getElementById("invoicenr").value,
	customernr:			document.getElementById("customernr").value,
	invoicedate:		document.getElementById("invoicedate").value,
	paymenttarget:		document.getElementById("paymenttarget").value,
	IBAN:		 		document.getElementById("IBAN").value,
	customer0:			document.getElementById("customer0").value,
	customer1:			document.getElementById("customer1").value,
	customer2:			document.getElementById("customer2").value,
	customer3:			document.getElementById("customer3").value,
	customer4:			document.getElementById("customer4").value
};
//Header for innerHTML fields
var headerHtml = {
	notesOverTable:		document.getElementById("notesOverTable").innerHTML,
	head:				document.getElementById("head").innerHTML,
	rechnungssteller:	document.getElementById("rechnungssteller").innerHTML,
	header0:			document.getElementById("header0").innerHTML,
	header1:			document.getElementById("header1").innerHTML,
	header2:			document.getElementById("header2").innerHTML,
	header3:			document.getElementById("header3").innerHTML,
	header4:			document.getElementById("header4").innerHTML,
	table0:				document.getElementById("table0").innerHTML,
	table1:				document.getElementById("table1").innerHTML,
	table2:				document.getElementById("table2").innerHTML,
	table3:				document.getElementById("table3").innerHTML,
	table4:				document.getElementById("table4").innerHTML,
	notizen:			document.getElementById("notizen").innerHTML
};
//Set Defaults for every Header (use " " for no default)
var defaulttable = {
	head:				"Rechnung/Angebot",
	rechnungssteller:	"net@talk GmbH Johannisstr. 24 D-84034 Landshut",
	header0:			"Rechnungsnr.:",
	header1:			"Kundennr.:",
	header2:			"Datum:",
	header3:			"Zahlungsziel:",
	header4:			"Bankverbindung",
	table0:				"Position",
	table1:				"Artikel",
	table2:				"Menge",
	table3:				"Einzelpreis",
	table4:				"Gesamtpreis",
	notizen:			"Notizen",
	notesOverTable:		"Amtsgericht, UmSt:"
};

//XML informations
var storagestring = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n";

var art = 				"XML"

//Filename for XML File (Date_Time_Invoicenumber)
var filename = moment(Date.now()).format("YYYY-MM-DD_HH-mm-ss_[uhr]_") + header["invoicenr"];


if( parseInt(count) >= 0){
count++;
}
else{
	count = 1;
}
localStorage.setItem("count", count)

var rows = getAllRows();
var num = rows.length;
var i = 0;

localStorage.setItem("rows_"+count, num)
storagestring += "<"+art+ ">\n";

//generate Header
let key;

storagestring += "<header>\n"

key = "";
for (key in header){
	if(header[key] == "") { header[key] = " ";}
	storagestring += "<" + key + ">" + header[key] + "</" + key + ">\n";
	localStorage.setItem(key + "_" + count, header[key])
}

key = "";
for (key in headerHtml){
	localStorage.setItem(key + "_" + count, headerHtml[key]);
	if(headerHtml[key] == "") { headerHtml[key] = defaulttable[key]}

	storagestring += "<" + key + ">" + headerHtml[key] + "</" + key + ">\n";
	localStorage.setItem(key + "_" + count, headerHtml[key]);
}

storagestring += "</header>\n"
storagestring += "<colums> "+ num +" </colums>\n";		//Number of rows to generate (needed to load from XML input)

//Row informations to XML and LocalStorage
while (i < num){
	storagestring += "<row>" + i + "\n";

	//Array needs to be generated for every row
	var data = {
		item:				document.getElementById("item_"+rows[i]).value,
		description:		document.getElementById("description_"+rows[i]).value,
		qty:				document.getElementById("qty_"+rows[i]).value,
		cost:				document.getElementById("cost_"+rows[i]).value,
		prcdiscount:		document.getElementById("prcdiscount_"+rows[i]).value
	}
	key = "";
for (key in data){
	//Set " " for no Information in Invoice (no error with XML read input)
	if(data[key] == "") { data[key]

	= " ";}
	storagestring += "<" + key + ">" + data[key] + "</" + key + ">\n";
	if(document.getElementById(key + "_" + rows[i]) != null){
		localStorage.setItem(key + "_" + count + "_" + i, document.getElementById(key+"_"+rows[i]).value);
	}
	}

	i++;
	storagestring += "</row>\n";
	}


storagestring += "</"+art+">\n";
download(filename + ".xml", storagestring);

eurosymbol();
window.print();
eurosymbolentfernen();
document.getElementById("submit_invoice").style.cursor = "pointer";
location.reload();
}



function download(filename, text) {					//Download XML File
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



function eurosymbol(){			//Add "€" to Inputs for printing
	var rows = getAllRows();
	var num = rows.length;
	var i = 0;

	while (i < num){
		hideDiscount(rows[i]);
		document.getElementById("cost_"+rows[i]).value = document.getElementById("cost_"+rows[i]).value + " €";
		document.getElementById("price_"+rows[i]).value = document.getElementById("price_"+rows[i]).value + " €";
		i++;
	}
	document.getElementById("net").value = document.getElementById("net").value + " €";
	document.getElementById("tax").value = document.getElementById("tax").value + " €";
	document.getElementById("total").value = document.getElementById("total").value + " €";
}

function eurosymbolentfernen(){		//Remove "€" from Inputs
	var rows = getAllRows();
	var num = rows.length;
	var i = 0;

	while (i < num){
		calculate(this, rows[i]);
		i++;
	}

}

function validatePos(){			//Change Position number to 1, 2, 3, ...
	var rows = getAllRows();
	var num = rows.length;
	var i1 = 1;
	var i = 0;

	while (i < num){
		document.getElementById("displaynum_"+rows[i]).innerHTML = i1;
		i++;
		i1++;
	}

}

function storage(val){			//Buttons left and right to view older Informations
	count = localStorage.getItem("view");
	if(val=="-1"){
		count--;
	}
	else if(val=="+1"){
		count++;
	}
	else{
		count = localStorage.getItem("count");
		count++;

	}
loadStorageolder(count);

}
