var boxes=[];

function addTable(val){			//new Table Row
	   table=document.getElementById("tablebody");
	   table.appendChild(generateTableRow(val));
validatePos();
   }


function generateTableRow(val) {		//HTML for Table Row and ID

	var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;


	var emptyColumn = document.createElement('tr');
		emptyColumn.setAttribute("id", new_qty);

	emptyColumn.innerHTML = '<td class="left-cells"><a href="javascript:return false;" class="del-href" onclick="deleteRow('+new_qty+')"><button type="button" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></a></td><td id="displaynum_'+new_qty+'" class="text-center displaynum">'+new_qty+'</td><td><input type="text" class="form-control item-title" id="item_'+new_qty+'" name="item_'+new_qty+'" required><textarea id="description_'+new_qty+'" class="form-control" cols="120" name="description_'+new_qty+'"></textarea></td><td><input type="text" class="form-control" id="qty_'+new_qty+'" name="qty_'+new_qty+'" value="1" onchange="calculate(this, '+new_qty+')" required></td><td> <span class="input-euro right"><input type="text" class="form-control text-right" id="cost_'+new_qty+'" name="cost_'+new_qty+'" value="0.00" onchange="calculate(this, '+new_qty+')" required></span> <input type="hidden" id="dsc_'+new_qty+'" class="form-control text-right" name="dsc_'+new_qty+'" value="0.00" readonly><a href="javascript:return false;" class="href-discount" onclick="showDiscount('+new_qty+')">-Rabatt</a><div id="discount_'+new_qty+'" class="discountUI" style="display:none"><table><tr><td>&nbsp;</td><td>&nbsp;</td><td align="right"><a href="javascript:return false;" onclick="hideDiscount('+new_qty+')">X</a></td></tr><tr><td><input type="radio" class="form-control" name="dc_'+new_qty+'" onclick="noDiscount(\'no\','+new_qty+');calculate(this,'+new_qty+');" checked></td><td>Kein Rabatt</td><td>&nbsp;</td></tr><tr><td><input type="radio" name="dc_'+new_qty+'" onclick="noDiscount(\'yes\','+new_qty+')"></td><td>% des Preises </td><td><input type="text" class="form-control" name="prcdiscount_'+new_qty+'" id="prcdiscount_'+new_qty+'" class="prcdiscount" onchange="calculate(this,'+new_qty+')" maxlength="5" readonly></td></tr></table></div><input type="hidden" class="form-control text-right" name="discountv_'+new_qty+'" id="discountv_'+new_qty+'" value=""></td><td><span class="input-euro right"><input type="text" id="price_'+new_qty+'" class="form-control text-right" name="price_'+new_qty+'" value="0.00" readonly="readonly"></span></td>';



	document.getElementById('qty').value = new_qty;
	return emptyColumn;
}


function deleteRow(id){

	document.getElementById("qty_"+id).value="0";
	document.getElementById("cost_"+id).value="0.00";
	document.getElementById("price_"+id).value="0.00";
	calculate(this,id);

	var elem = document.getElementById(id);
	elem.parentElement.removeChild(elem);

validatePos();

}

function getAllRows(){		//Save all IDs of Rows in Array

var idArr = [];

	tr = document.getElementById("tablebody").getElementsByTagName("TR");

	for(var i=0;i<tr.length;i++){

		if(tr[i].id!=""){
		idArr.push(tr[i].id);
		}
	}

	return idArr;
}

function calculate(source,val){



	if(val==undefined){
		//get ID of Row
		var tr = source.parentNode.parentNode;
		id=tr.getAttribute('id');
	}else{
		id=val;
	}

	document.getElementById('dsc_'+val).value="-"+ document.getElementById('prcdiscount_'+val).value + "%";

	qty=document.getElementById("qty_"+id).value;

	cost=document.getElementById("cost_"+id).value;
	cost=parseFloat(cost).toFixed(2);

	//calculate cost
	document.getElementById("cost_"+id).value=cost;

	//Discount
	var param=parseFloat(Number(100)).toFixed(2);

	var discount=document.getElementById("prcdiscount_"+id).value;

	if(discount!=""){
		discount=parseFloat(Number(discount)).toFixed(2);
		document.getElementById("discountv_"+id).value=discount;
		discount=param-discount;
		cost=cost/param*discount;

	}

	price=qty*cost;
	price=parseFloat(price).toFixed(2);
	document.getElementById("price_"+id).value=price;

	idArr=getAllRows();

	//******************************
	//calculate net,tax,total price
	//*****************************
	net="0.00";
	for(var i=0;i<idArr.length;i++){

		price=document.getElementById("price_"+idArr[i]).value;
		price=parseFloat(price).toFixed(2);
		net=Number(net)+Number(price);

	}

	net=parseFloat(net).toFixed(2);
	tax=parseFloat(Number(net)*19.00/100).toFixed(2);
	total=parseFloat(Number(net)+Number(tax)).toFixed(2);

	document.getElementById("net").value=net;
	document.getElementById("tax").value=tax;
	document.getElementById("total").value=total;
}

//============================
// Discount functions
//============================
function showDiscount(val) {
   document.getElementById('discount_'+val).style.display = "block";
}

function hideDiscount(val) {
   document.getElementById('discount_'+val).style.display = "none";
}

function noDiscount(val,nr){

	if(val=="no"){
		document.getElementById('prcdiscount_'+nr).value="";
		document.getElementById('discountv_'+nr).value="";
		document.getElementById('prcdiscount_'+nr).readOnly=true;
		document.getElementById('dsc_'+nr).type="hidden";

	}

	if(val=="yes"){
		document.getElementById('prcdiscount_'+nr).value="";
		document.getElementById('prcdiscount_'+nr).style.display="block";
		document.getElementById('prcdiscount_'+nr).readOnly=false;
		document.getElementById('dsc_'+nr).type="text";

	}
}

function settings(){
	var old = $("#history").css("display");

	switch(old) {
		case "none":
			$("#history").css("display", "block");

			break;
		case "block":
			$("#history").css("display", "none");

			break;
	}
}
