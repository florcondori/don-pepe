const MyBag = ()=>{
	$(_=>{
		$(".close").show();
		$(".bag").hide();
		$(".sign-in").hide();
	});
	console.log(state.bag);
	const divContainer = $("<div class='conatiner-fluid'></div>");

	$.each(state.bag, (i, obj)=>{
		let div = $(`<div class='row' id='${obj.id}'></div>`);
		let divImg = $("<div class='col-xs-3'></div>");
		let img = $(`<img src='assets/img/${obj.img}' />`);
		let divDescription = $("<div class='col-xs-9'></div>");
		let sub1 = $("<div class='col-xs-12'></div>");
		let name = $(`<span>${obj.name}<span>`);
		let aRemove = $("<a href='#'><i class='glyphicon glyphicon-trash'></i></a>");
		let sub2 = $("<div class='col-xs-12'></div>");
		let select = $("<select></select>");
		for(var i=1; i<=obj.cant; i++){
			let option = $(`<option value='${i}'>${i}</option>`);
			if(i == obj.valueSelected){
				option.prop("selected", true);	
			} 
			select.append(option);
		};
		console.log($('select').val());
		let purchase = parseInt(select.val()) * parseFloat(obj.precio);
		let price = $(`<span class='sub-total'>${purchase}</span>`);	

		select.on("change", (e)=>{			
			state.bag.filter( el => el.id == obj.id)[0].valueSelected = $(e.currentTarget).val();
			
			$(e.currentTarget).next().text(parseInt($(e.currentTarget).val())*parseFloat(obj.precio));
		});

		aRemove.on("click", (e)=>{
			e.preventDefault();
			$(e.currentTarget).closest(".row").remove();
			const id = $(e.currentTarget).closest(".row").prop("id");
			let indx;
			console.log(id);
			state.bag.forEach((obj, index)=>{
				if(obj.id == id){
					indx = index;
					console.log("eliminando"+obj.name);
				}
			});
			console.log("eliminando el indx"+ indx);
			state.bag.splice(indx,1);
		});

		divImg.append(img);

		sub1.append(name);
		sub1.append(aRemove);
		sub2.append(select);
		sub2.append(price);

		divDescription.append(sub1);
		divDescription.append(sub2);

		div.append(divImg);
		div.append(divDescription);

		divContainer.append(div);
	});

	const divTotal = $("<div class='row'></div>");
	const col12T = $("<div class='col-xs-12'></div>");
	const span = $("<span>Total</span>");
	const total = $("<span>0</span>");
	const divCheckout = $("<div class='row'></div>");
	const col12C = $("<div class='col-xs-12'></div>");
	const aCheckout = $("<a href='#'>Checkout <i class='glyphicon glyphicon-chevron-right'></i></a>");

	let totalStateBag = state.bag.map( el => parseInt(el.valueSelected) * parseFloat(el.precio) )
								 .reduce((sum, actual) => sum + parseFloat(actual), 0);
	total.text(totalStateBag);
	//actualizar el total cuando hay cambios en cada producto
	$(()=>{
		$("select").on("change", (e)=>{			
			let precios = [];
			$(".sub-total").each((i,el)=>{
				precios.push(parseFloat($(el).text()));
			});

			total.text(precios.reduce((sum, actual)=> sum + parseFloat(actual), 0));
		});
	});

	col12C.append(aCheckout);
	divCheckout.append(col12C);

	col12T.append(span);
	col12T.append(total);
	divTotal.append(col12T);
	
	divContainer.append(divTotal);
	divContainer.append(divCheckout);

	return divContainer;
};