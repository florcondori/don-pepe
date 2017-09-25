const Header = (update)=>{
	const header = $("<header class='container-fluid'></header>");
	const row = $("<div class='row'></div>");
	const sub1 = $("<div class='col-xs-8 text-center'></div>");
	const aReturn = $("<a href='#' class='return'><i class='glyphicon glyphicon-chevron-left'></i></a>");
	const logo = $("<span><strong>Don Pepe</strong></span>");
	const sub2 = $("<div class='col-xs-4 text-right'></div>");
	const aSignIn = $("<a href='#' class='sign-in'><i class='glyphicon glyphicon-user'></i></a>");
	const aBag = $("<a href='#' class='bag'><i class='glyphicon glyphicon-shopping-cart'></i><span class=''></span></a>");
	const aClose = $("<a href='#' class='close'><i class='glyphicon glyphicon-remove'></i></a>");
	aReturn.hide();
	aClose.hide();

	const inicio = ()=>{
		state.productSelected = null;
		state.page = null;
		update();
	};

	aReturn.on("click", (e)=>{
		e.preventDefault();
		inicio();
	});

	aClose.on("click", (e)=>{
		e.preventDefault();
		inicio();
	});

	aBag.on("click", (e)=>{
		e.preventDefault();
		console.log("ver bag");
		state.page = MyBag;
		update();
	});

	sub1.append(aReturn);
	sub1.append(logo);

	sub2.append(aSignIn);
	sub2.append(aBag);
	sub2.append(aClose);

	row.append(sub1);
	row.append(sub2);
	header.append(row);

	return header;	
};
