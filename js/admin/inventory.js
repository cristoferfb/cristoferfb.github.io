// insert a inventory node for every product
function fillInventory() {
	_inventory.forEach((product, index) => 
		$("#inventory").append(getInventoryNode(product, index)))
}

// generate an inventory node
function getInventoryNode(product, index) {
  return $('<li class="list-group-item list-group-item-action"></li>').append(
		$('<div class="row"></div>').append(
			$('<div class="col-xs-2"></div>').append(
				$('<img src="'+product.img+'" class="img-thumbnail"></img>')),
			$('<div class="col"></div>').text(product.name),
			$('<div class="col-3 d-md-none d-lg-block"></div>').text('$'+product.value),
			$('<div class="col text-center"></div>').append(
				$('<button class="btn btn-primary" data-toggle="collapse" data-target="#collapseInventory'+index+'" aria-expanded="false" aria-controls="collapseInventory'+index+'"></button>').append(
					$('<i class="fas fa-edit"></i>')),
				$('<button class="btn btn-danger" onclick="removeFromInventory(this, '+index+')"></button>').append(
					$('<i class="fas fa-trash-alt"></i>')))),
		$('<div class="collapse" id="collapseInventory'+index+'"></div>').append(getEditForm(product, index)))
}

// generate an edition form for a product
function getEditForm (product, index) {
	return $('<div class="mt-2 inventoryForm"></div>').append(
		$('<div class="form-group"></div>').append(
			$('<label>Product name</label>'),
			$('<input id="productName'+index+'" type="text" class="form-control" placeholder="'+product.name+'"/>')),
		$('<div class="form-group"></div>').append(
			$('<label>Value</label>'),
			$('<input id="productValue'+index+'" type="number" class="form-control" placeholder="$'+product.value+'"/>')),
		$('<div class="form-group"></div>').append(
			$('<label>Image url</label>'),
			$('<input id="productImg'+index+'" type="text" class="form-control" placeholder="'+product.img+'"/>')),
		$('<div class="form-group"></div>').append(
			$('<label>Stock</label>'),
			$('<input id="productStock'+index+'" type="number" class="form-control" value="'+product.stock+'"/>')),
		$('<button class="btn btn-primary btn-block" onclick="setProduct('+index+')"></button>').append(
			$('<i class="fas fa-save"></i>')))
}

// update product info from edition form
function setProduct (id) {
	if (!id) {
		id = _inventory.length
		_inventory.push({})
		$('#productName').val() && (_inventory[id].name = $('#productName').val())
		$('#productValue').val() && (_inventory[id].value = parseInt($('#productValue').val()))
		$('#productImg').val() && (_inventory[id].img = $('#productImg').val())
		$('#productStock').val() && (_inventory[id].stock = parseInt($('#productStock').val()))
	} else {
		$('#productName'+id).val() && (_inventory[id].name = $('#productName'+id).val())
		$('#productValue'+id).val() && (_inventory[id].value = parseInt($('#productValue'+id).val()))
		$('#productImg'+id).val() && (_inventory[id].img = $('#productImg'+id).val())
		$('#productStock'+id).val() && (_inventory[id].stock = parseInt($('#productStock'+id).val()))
	}
	$('#productName').val('')
	$('#productValue').val('')
	$('#productImg').val('')
	$('#productStock').val('')
	reloadInventory()
}

// import products from csv file
function importFromCsv() {
	$("#attachment").click()
    $("#attachment").one('change', () =>
		$("#attachment").parse({
			config: {
				complete: result => {
					_inventory = _inventory.concat(result.data)
					reloadInventory()
					$("#attachment").one('change', null)
				},
				dynamicTyping: true,
				header: true
			},
			complete: () => $("#attachment").val('')
		}))

}

// remove a product form the inventory
function removeFromInventory (node, id) {
	_inventory.splice(id, 1)
	reloadInventory()
}

// reload inventory nodes
let reloadInventory = () => $("#inventory").empty() && fillInventory()

// get all products
let getProducts = () => {return _inventory}

// get product by id
let getProduct = id => {return _inventory[id]}

// list of products in the store
let _inventory = [{
  'name': 'Hoja de cuadernillo',
  'img': 'https://cdn.shopify.com/s/files/1/1045/5226/products/hoja_de_cuadernillo_grande.gif?v=1498574172',
  'value': 50,
  'stock': 10,
},{
  'name': 'Lapiz pasta',
  'img': 'https://http2.mlstatic.com/lapiz-pasta-bic-D_NQ_NP_20527-MLC20193537461_112014-F.jpg',
  'value': 500,
  'stock': 10,
},{
  'name': 'Corchetera',
  'img': 'https://isofit.cl/wp-content/uploads/2017/01/11281-K-Corchetera-Met%C3%A1lica-CM-50.jpg',
  'value': 3000,
  'stock': 10,
},{
  'name': 'Colafria',
  'img': 'https://officemax.vteximg.com.br/arquivos/ids/170272-1000-1000/92616_1.jpg?v=636246906670000000',
  'value': 1500,
  'stock': 10,
},{
  'name': 'Impresion a color',
  'img': 'https://imprentalascondes.cl/wp-content/uploads/2016/09/IMPRESION-DIGITAL-A-COLOR-1.jpg',
  'value': 50,
  'stock': 10,
},{
  'name': 'Impresion en blanco y negro',
  'img': 'https://imprentalascondes.cl/wp-content/uploads/2020/02/COPIAS-EN-BLANCO-Y-NEGRO.jpg',
  'value': 10,
  'stock': 10,
}]