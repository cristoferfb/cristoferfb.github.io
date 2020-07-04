let _orders = []

// insert a order node for every order
let fillOrders = () => _orders.forEach((order, index) => 
		$("#orders").append(getOrderNode(order, index)))


function downloadAttachment (index) {
	let link = document.createElement("a");
  link.download = "print";
  link.href = _orders[index][0].attachment;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// generate a order node
function getOrderNode (order, index) {
	return $('<a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapseOrder'+index+'" role="button" aria-expanded="false" aria-controls="collapseOrder'+index+'"></a>')
		.append(
			"#"+(index+1)+" "+order[0].name,
			$('<div class="collapse" id="collapseOrder'+index+'"></div>').append(
				getOrderList(order),
				order[0].comment ?
					$('<input type="text" class="form-control" value="'+order[0].comment+'" disabled/>') : '',
				order[0].attachment ?
					$('<a onclick="downloadAttachment(\''+index+'\')">Download Attachment</a>') : '',
				$('<button class="btn btn-danger btn-block mt-2" onclick="removeOrder('+index+')"></button>').append(
					$('<i class="fas fa-trash-alt"></i>')
				),
				$('<button class="btn btn-success btn-block" onclick="checkOrder('+index+')"></button>').append(
					$('<i class="fas fa-check"></i>'))))
}

// generate a list of products
function getOrderList (order) {
	let products = $('<ul class="list-group list-group-flush"></ul>')
	order.forEach((product, index) => 
		index != 0 && products.append(getOrderProduct(product)))
	products.append(getTotalNode(order))
	return products
}

// get node for display total
function getTotalNode (order) {
	let totalValue = 0;
	order.forEach(product => (totalValue += product.count ? product.count * product.value : 0))
	return $('<li class="list-group-item"></li>').append(
		$('<div class="row"></div>').text('Total: $'+ totalValue))
}

// get a product node for insert in a list
function getOrderProduct (product) {
	return $('<li class="list-group-item"></li>').append(
		$('<div class="row"></div>').append(
			$('<div class="col-xs-2"></div>').append(
				$('<img src="'+product.img+'" class="img-thumbnail"></img>')),
			$('<div class="col-4 d-md-none d-lg-block"></div>').text(product.name),
			$('<div class="col"></div>').text('$'+product.value),
			$('<div class="col text-center"></div>').append(
				$('<input value="'+product.count+'" class="cartNodeCount" disabled>'))))
}

//set the index order as finished and procede to discount the items of the library stock
function checkOrder(index){
	_orders[index].forEach(orderProduct => 
		_inventory.forEach((product, index) => {
			if (orderProduct.name == product.name) {
				let stock = product.stock - orderProduct.count
				_inventory[index].stock = stock < 0 ? 0 : stock
			}}))
	reloadInventory()
	removeOrder(index)
}

//delete the order without discounting the items of the stock
function removeOrder(index){
	_orders.splice(index, 1)
	$('#orders').empty()
	fillOrders()
}