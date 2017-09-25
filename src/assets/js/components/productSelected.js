const ProductSelected = (update)=>{
	$(_=>{
		$(".return").show();
	});
	
	const div = $("<div class='container-fluid'></div>");
	const row = $("<div class='row'></div>");
	const col5 = $("<div class='col-xs-12 col-sm-5'></div>");
	const img = $(`<img src='assets/img/${state.productSelected.img}' />`);
	const col7 = $("<div class='col-xs-12 col-sm-7'></div>");
	const title = $(`<h4>${state.productSelected.name}</h4>`);
	const price = $(`<span>${state.productSelected.precio}</span>`);
	const sub1 = $("<div class='col-xs-12'></div>");
	const selectTag = $("<select></select>");
	for(var i=1; i<=state.productSelected.cant; i++){
		let option = $(`<option value='${i}'>${i}</option>`);

		selectTag.append(option);
	};

	const btnAddBag = $("<button>Comprar</button>");

	btnAddBag.on("click", (e)=>{
		e.preventDefault();
		let spanBadge = $(".bag").find('span');
		let valueSelected = selectTag.val();

		if(spanBadge.text()){
			spanBadge.text(parseInt(spanBadge.text()) + parseInt(valueSelected));
		}else{
			spanBadge.addClass('badge').text(valueSelected);
		}

		setTimeout(()=>{
			state.page = MyBag;
			state.bag.push(Object.assign({}, state.productSelected,{valueSelected: valueSelected}));
			update();
		}, 2000);
		
	});

	sub1.append(selectTag);
	sub1.append(btnAddBag);

	col5.append(img);
	col7.append(title);
	col7.append(price);
	col7.append(sub1);

	row.append(col5);
	row.append(col7);

	div.append(row); 

	return div;
};