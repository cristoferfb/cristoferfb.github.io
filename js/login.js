// current logged user email
let userEmail = ""

// clear all nodes inserted by other functions
function clearAll () {
	_cart = []
	$('#cart').empty()
	$('#products').empty()
	$("#orders").empty()
	$("#inventory").empty()
}

// Go to specific view (login, user, admin)
function goTo (name) {
	hideAllViews()
	// reveal only the selected view
	$('#'+name).css('display', 'block')
}

// hide all views xd
function hideAllViews () {
	// styles of  login
	$('body').css('display', 'block')
	$('body').css('align-items', 'left')
	// hide all views
	$('#login').css('display', 'none')
	$('#admin').css('display', 'none')
	$('#user').css('display', 'none')
}

// evaluate login for redirect
function evaluateLogin () {
	userEmail = $('#inputUser').val()
	let password  = $('#inputPassword').val()
	clearAll()
	if (password)
		$('#passwordModal').modal('show')
	else
		switch (userEmail) {
			case 'admin':
				fillOrders()
				fillInventory()
				goTo('admin')
				break
			case 'user':
				fillProductGallery()
				goTo('user')
				break
			default:
				$('#userModal').modal('show')
		}
}
