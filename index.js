let userEmail = ""

// Go to specific view (login, user, admin)
function goTo (name) {
	hideAll()
	// reveal only the selected view
	$('#'+name).css('display', 'block')
}

// hide all views
function hideAll () {
	// styles of  login
	$('body').css('display', 'block')
	$('body').css('align-items', 'left')
	// hide all views
	$('#login').css('display', 'none')
	$('#admin').css('display', 'none')
	$('#user').css('display', 'none')
}

// evaluate login
function evaluateLogin () {
  userEmail = $('#inputUser').val()
	switch (userEmail) {
    case 'admin':
      fillOrders()
      goTo('admin')
      break
    case 'user':
      fillProductGallery()
      goTo('user')
      break
  }
}

function processOrder () {
  let order = [{name: userEmail}].concat(_cart)

  $('.cartNodeCount').map((index, node) => {
    order[index+1].count = parseInt($(node).val())
  })
  _cart = []
  $("#cart").empty()
  _orders.push(order)
}

// add product to cart array
function addProductToCart (id) {
  // check if product exist
  let flag = false
  _cart.forEach( product => {
    if (product.id == id) {
      flag = true
    }
  })
  if (flag) return
  let product = getProduct(id)
  _cart.push(product)
  addCartNode(product)
}

// get a product node for insert in DOM
function getProductNode (product) {
  return $('<div class="card mb-3"></div>').append(
    $('<img src="'+product.img+'" class="card-img-top">'),
    $('<div class="card-body"></div>').append(
      $('<h5 class="card-title"></h5>').text(product.name),
      $('<h5 class="card-title"></h5>').text("$"+product.value),
      $('<btn class="btn btn-primary" onclick="addProductToCart('+product.id+')"></btn>')
        .text("Comprar")
    )
  )
}

// get a cart node for insert in DOM
function getCartNode (product) {
  return $('<li class="list-group-item"></li>').append(
    $('<div class="row"></div>').append(
      $('<div class="col-xs-2"></div>').append(
        $('<img src="'+product.img+'" class="img-thumbnail"></img>')
      ),
      $('<div class="col-4"></div>').text(product.name),
      $('<div class="col-3"></div>').text('$'+product.value),
      $('<div class="col"></div>').append(
        $('<input value="1" class="cartNodeCount">')
      ),
      $('<div class="col text-right"></div>').append(
        $('<button class="btn btn-danger" onclick="removeFromCart(this, '+product.id+')"></button>').append(
          $('<i class="fas fa-trash-alt"></i>')
        )
      )
    ) 
  )
}

function getProductOrderNode (order) {
  let products = $('<div></div>')
  order.forEach((product, index) => {
    if (index != 0)
      products.append(getCartNode(product))
  })

  return products
}

function getOrderNode (order, index) {
  return $('<a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapseExample'+index+'" role="button" aria-expanded="false" aria-controls="collapseExample'+index+'"></a>')
    .append(
      "#"+(index+1)+" "+order[0].name,
      $('<div class="collapse" id="collapseExample'+index+'"></div>').append(
        getProductOrderNode(order)
      )
    )
}

function fillOrders () {
  _orders.forEach((order, index)=>{
    $("#orders").append(getOrderNode(order, index))
  })
}

// <a class="list-group-item list-group-item-action" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
//   Pedido de juanito
//   <div class="collapse" id="collapseExample">
//     <div id="test"></div>
//   </div>  
// </a>

function removeFromCart (node, id) {
  $(node).parent().parent().parent().remove()
  for (let i=0; i<_cart.length; i++) {
    if (_cart[i].id == id) 
      _cart.splice(i, 1)
  }
}

// fill gallery node with product nodes
function fillProductGallery () {
  getProducts().forEach(product => {
    $('#products').append(
      $('<div class="col-6 col-md-4 col-lg-3"></div>')
        .append(getProductNode(product))
    )
  })
}

// Fill cart node with product nodes from cart array
function addCartNode (product) {
  $('#cart').append(getCartNode(product))
}


// get products from api
function getProducts () {
  let products = _products
  return products
}

// get product by id
function getProduct (id) {
  return _products[id]
}

function getCart () {
  return _cart
}

let _products = [{
  'id': 0,
  'name': 'Hoja de cuadernillo',
  'img': 'https://cdn.shopify.com/s/files/1/1045/5226/products/hoja_de_cuadernillo_grande.gif?v=1498574172',
  'value': 50
},{
  'id': 1,
  'name': 'Lapiz pasta',
  'img': 'https://http2.mlstatic.com/lapiz-pasta-bic-D_NQ_NP_20527-MLC20193537461_112014-F.jpg',
  'value': 500
},{
  'id': 2,
  'name': 'Corchetera',
  'img': 'https://isofit.cl/wp-content/uploads/2017/01/11281-K-Corchetera-Met%C3%A1lica-CM-50.jpg',
  'value': 3000
},{
  'id': 3,
  'name': 'pegamento',
  'img': 'https://officemax.vteximg.com.br/arquivos/ids/170272-1000-1000/92616_1.jpg?v=636246906670000000',
  'value': 10000
}]

let _orders = []

let _cart = []