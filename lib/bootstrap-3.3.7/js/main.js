var boxes=[];

function addTable(val){	   
	   table=document.getElementById("tablebody");
	   table.appendChild(generateTableRow(val));
	
   }
   
function generateTableRow(val) {
		
	var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;
	
	var emptyColumn = document.createElement('tr');
		emptyColumn.setAttribute("id", new_qty);
		//displayDiscountDiv(new_qty);
	//emptyColumn.innerHTML = '<td><input type="checkbox" name="chk[]" id="'+new_qty+'" value="'+new_qty+'" onclick="singletoggle(this)"><a href="javascript:return false;" onclick="deleteRow('+new_qty+')">Löschen</a></td><td>'+new_qty+'</td><td><input type="text" id="item_'+new_qty+'" name="item_'+new_qty+'" required><textarea id="description_'+new_qty+'" name="description_'+new_qty+'"></textarea></td><td><input type="text" id="qty_'+new_qty+'" name="qty_'+new_qty+'" value="1" onchange="calculate(this)" required></td><td> <input type="text" id="cost_'+new_qty+'" name="cost_'+new_qty+'" value="0.00" onchange="calculate(this)" required><a href="javascript:return false;" onclick="showDiscount('+new_qty+')">-Rabatt</a><div id="discount_'+new_qty+'" class="discountUI" style="display:none"><table><tr><td>&nbsp;</td><td>&nbsp;</td><td align="right"><a href="javascript:return false;" onclick="hideDiscount('+new_qty+')">X</a></td></tr><tr><td><input type="radio" name="dc_'+new_qty+'" onclick="noDiscount(\'no\','+new_qty+');calculate(this,'+new_qty+');" checked></td><td>Kein Rabatt</td><td>&nbsp;</td></tr><tr><td><input type="radio" name="dc_'+new_qty+'" onclick="noDiscount(\'yes\','+new_qty+')"></td><td>% des Preises </td><td><input type="text" name="prcdiscount_'+new_qty+'" id="prcdiscount_'+new_qty+'" class="prcdiscount" onchange="calculate(this,'+new_qty+')" maxlength="5" readonly></td></tr></table></div><input type="hidden" name="discountv_'+new_qty+'" id="discountv_'+new_qty+'" value=""></td><td><input type="text" id="price_'+new_qty+'" name="price_'+new_qty+'" value="0.00" readonly="readonly"></td>';
	emptyColumn.innerHTML = '<td><a href="javascript:return false;" onclick="deleteRow('+new_qty+')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td>'+new_qty+'</td><td><input type="text" id="item_'+new_qty+'" name="item_'+new_qty+'" size="45" required> <a href="#" onclick="oeffnefenster(\'Produktliste.php?row='+new_qty+'\')" id="list_'+new_qty+'"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a><textarea id="description_'+new_qty+'" name="description_'+new_qty+'" style="resize:none;width:349px;height:80px""></textarea></td><td><input type="text" id="qty_'+new_qty+'" name="qty_'+new_qty+'" value="1" onchange="calculate(this)" required></td><td> <input type="text" id="cost_'+new_qty+'" name="cost_'+new_qty+'" value="0.00" onchange="calculate(this)" required><a href="javascript:return false;" onclick="showDiscount('+new_qty+')">-Rabatt</a><div id="discount_'+new_qty+'" class="discountUI" style="display:none"><table><tr><td>&nbsp;</td><td>&nbsp;</td><td align="right"><a href="javascript:return false;" onclick="hideDiscount('+new_qty+')">X</a></td></tr><tr><td><input type="radio" name="dc_'+new_qty+'" onclick="noDiscount(\'no\','+new_qty+');calculate(this,'+new_qty+');" checked></td><td>Kein Rabatt</td><td>&nbsp;</td></tr><tr><td><input type="radio" name="dc_'+new_qty+'" onclick="noDiscount(\'yes\','+new_qty+')"></td><td>% des Preises </td><td><input type="text" name="prcdiscount_'+new_qty+'" id="prcdiscount_'+new_qty+'" class="prcdiscount" onchange="calculate(this,'+new_qty+')" maxlength="5" readonly></td></tr></table></div><input type="hidden" name="discountv_'+new_qty+'" id="discountv_'+new_qty+'" value=""></td><td><input type="text" id="price_'+new_qty+'" name="price_'+new_qty+'" value="0.00" readonly="readonly"></td>';

	document.getElementById('qty').value = new_qty;
	return emptyColumn;
}

function singletoggle(source){
//alert(JSON.stringify(boxes));	
var count=0;
	val=source.value;
	if(source.checked==true){
		
		console.log("singlechecked: "+source.value);
		
		
			for(var x=0;x<boxes.length;x++){
				if(val==boxes[x]){
					count++;
				}
			}
			
			if(count==0){
			boxes.push(val);
			console.log("singlepushed:"+val);
			}
	}
	
	if(source.checked==false){
	
		console.log("singleNOT: "+source.value);
		
			for(var y=0;y<boxes.length;y++){
				if(val==boxes[y]){
					boxes.splice(y,1);
					console.log("singledelete: "+source.value);
				}
			}
	}
//alert(JSON.stringify(boxes));
}

function deleteRow(id){
	
	document.getElementById("qty_"+id).value="0";
	document.getElementById("cost_"+id).value="0.00";
	document.getElementById("price_"+id).value="0.00";
	calculate(this,id);
	
	var elem = document.getElementById(id);
	elem.parentElement.removeChild(elem);
	
}

function getAllRows(){
	
var idArr = [];

	tr = document.getElementById("tablebody").getElementsByTagName("TR");

	for(var i=0;i<tr.length;i++){
		
		if(tr[i].id!=""){
		idArr.push(tr[i].id);
		}
	}
	
	return idArr;
}

function ParentgetAllRows(){
	
var idArr = [];

	tr = opener.document.getElementById("tablebody").getElementsByTagName("TR");

	for(var i=0;i<tr.length;i++){
		
		if(tr[i].id!=""){
		idArr.push(tr[i].id);
		}
	}
	
	return idArr;
}

function calculate(source,val){
	
	if(val==undefined){
		//get ID from table row
		var tr = source.parentNode.parentNode;
		id=tr.getAttribute('id');
	}else{
		id=val;
	}
	
	//get values from current row
	qty=document.getElementById("qty_"+id).value;
	
	cost=document.getElementById("cost_"+id).value;
	cost=parseFloat(cost).toFixed(2);
	
	//refresh cost with decimals
	document.getElementById("cost_"+id).value=cost;
	
	//discount
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
	
	//get all article prices 
	idArr=getAllRows();

	//******************************
	//calculate net,tax,total price
	//******************************
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
		
	}
	
	if(val=="yes"){
		document.getElementById('prcdiscount_'+nr).value="";
		document.getElementById('prcdiscount_'+nr).style.display="block";
		document.getElementById('prcdiscount_'+nr).readOnly=false;
	}
}
/*
function discountPrice(val){
	
	var param=parseFloat(Number(100)).toFixed(2);
	
	var price=document.getElementById('cost_'+val).value;
		price=parseFloat(Number(price)).toFixed(2);
		
	var discount=document.getElementById('prcdiscount_'+val).value;
		discount=parseFloat(Number(discount)).toFixed(2);

	var discount=param-discount;

	price=price/param*discount;
	alert(price);
}*/

function oeffnefenster (url) {
   fenster = window.open(url, "Produktliste", "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
   fenster.focus();
}

function calculateAgain(){
	
	//get all article prices 
	idArr=ParentgetAllRows();
	
	//******************************
	//calculate net,tax,total price
	//******************************
	net="0.00";
	for(var i=0;i<idArr.length;i++){
		
		price=opener.document.getElementById("price_"+idArr[i]).value;
		price=parseFloat(price).toFixed(2);
		net=Number(net)+Number(price);
	
	}
	
	net=parseFloat(net).toFixed(2);
	tax=parseFloat(Number(net)*19.00/100).toFixed(2);
	total=parseFloat(Number(net)+Number(tax)).toFixed(2);

	opener.document.getElementById("net").value=net;
	opener.document.getElementById("tax").value=tax;
	opener.document.getElementById("total").value=total;
}

function AddProducttoInvoice(val,row){
	var artikel=document.getElementById("productname_"+val).value;
	var description=document.getElementById("description_"+val).value;
	var price=document.getElementById("price_"+val).value;
	
	opener.document.getElementById("item_"+row).value=artikel;
	opener.document.getElementById("description_"+row).value=description;
	opener.document.getElementById("cost_"+row).value=price;
	opener.document.getElementById("qty_"+row).value="1";
	opener.document.getElementById("price_"+row).value=price;
	calculateAgain();
	window.close();
}
