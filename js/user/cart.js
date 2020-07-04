let _cart = []

// return current user cart
let getCart = () => {return _cart}

// Fill cart node with product nodes from cart array
let addCartNode = product => $('#cart').append(getCartNode(product))

// remove an element from user cart
function removeProduct (node,name) {
	$(node).parent().parent().parent().remove()
	for (let i=0; i<_cart.length; i++)
		_cart[i].name.trim().toUpperCase() == name.trim().toUpperCase() && _cart.splice(i, 1)
}

// add product to cart array
function addProductToCart (id) {
	let currentProduct = getProduct(id)
	// check if product exist
	for(var i=0; i <_cart.length; i++)
		if(currentProduct.name == _cart[i].name){
			$('.cartNodeCount')[i].value = ++_cart[i].count
			$('#total').text('Total: $'+ getTotal())
			return
		}
	currentProduct.count = 1
	_cart.push(currentProduct)
	addCartNode(currentProduct)
	$('#total').text('Total: $'+ getTotal())
	return
}
//fill with the total of the current elements in it
function getTotal(){
	let totalValue = 0
	for(let i=0 ; i<_cart.length;i++){
		let currentProduct = _cart[i]
		totalValue = totalValue + (currentProduct.count * currentProduct.value)
	}
	return totalValue
}


// add cart to orders list
function processOrder () {
	let reader = new FileReader()
	reader.onload = e => generateOrder(e.target.result)

	if ($('#attachment')[0].files[0])
		reader.readAsDataURL($('#attachment')[0].files[0])
	else
		generateOrder (null)
}

function generateOrder (attachmentUrl) {
	// generate the order
	let order = [{
		name: userEmail,
		attachment: attachmentUrl,
		comment: $('#comment').val()
	}].concat(_cart)
	// add count for every product in the cart
	$('.cartNodeCount').map((index, node) => {
		order[index+1].count = parseInt($(node).val())})
	// clear cart
	_cart = []
	$('#cart').empty()
	$('#attachment').val('')
	$('#comment').val('')
	$('#total').text('Total: $0')
	// add the order
	_orders.push(order)
}

// get a cart node for insert in DOM
function getCartNode (product) {
	return $('<li class="list-group-item"></li>').append(
		$('<div class="row"></div>').append(
			$('<div class="col-xs-2"></div>').append(
				$('<img src="'+product.img+'" class="img-thumbnail"></img>')),
			$('<div class="col-4"></div>').text(product.name),
			$('<div class="col-3"></div>').text('$'+product.value),
			$('<div class="col"></div>').append(
				$('<input type="number" value="'+product.count+'" class="cartNodeCount">')),
			$('<div class="col text-right"></div>').append(
				$('<button class="btn btn-danger" onclick="removeProduct(this,\''+product.name+'\')"></button>').append(
					$('<i class="fas fa-trash-alt"></i>')))))
}