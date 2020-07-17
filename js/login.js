// accounts array
let _accounts = [
	{ user: "admin", pass: "", level: 1 },
	{ user: "user", pass: "", level: 2 },
] 

// current logged user email
let userEmail = ""

// clear all nodes inserted by other functions
function clearAll () {
	_cart = []
	$('#cart').empty()
	$('#products').empty()
	$("#orders").empty()
	$("#inventory").empty()
	$('#inputUser').val("")
	$('#inputPassword').val("")
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
	// check login credentials
	let level = checkPassword(userEmail, $('#inputPassword').val())
	if (level < 1) {
		$('#accountModal').modal('show')
		return
	}
	// redirect to correct view on successful login
	clearAll()
	switch (level) {
		case 1:
			fillOrders()
			fillInventory()
			goTo('admin')
			break
		case 2:
			fillProductGallery()
			goTo('user')
			break
	}
}

// check password and return access level of the account
function checkPassword (user, pass) {
	for (i=0; i<_accounts.length; i++)
		if (_accounts[i].user === user)
			if (_accounts[i].pass == pass)
				return _accounts[i].level
			else
				break
	return 0
}	

// register an account
function register () {
	// check if user exist
	let user = $('#inputUser').val()
	if (user == "") {
		$('#userExistModal').modal('show')
		return
	}
	for (i=0; i<_accounts.length; i++) 
		if (_accounts[i].user ===  user) {
			$('#userExistModal').modal('show')
			return
		}
	// register account
	_accounts.push({
		user: user,
		pass: $('#inputPassword').val(),
		level: 2
	})
	clearAll()
	$('#registerModal').modal('show')
}