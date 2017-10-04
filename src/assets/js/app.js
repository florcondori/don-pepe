'use strict';
const render = (root)=>{
	root.empty();
	const update = ()=>render(root);
	const wrapper = $("<div class='wrapper'></div>");

	wrapper.append(Header(update));
	
	if(state.page !== null){
		wrapper.append(state.page(update));
	}else{
		wrapper.append(Welcome);
		wrapper.append(Stock(update));
	}

	root.append(wrapper);
};

const state = {
	products: null,
	user: null,
	productSelected: null,
	bag: [],
	page: null
};

$(_=>{

	$.getJSON('/api/products/', data =>{
		state.products = data;
		
		const root = $(".root");
		render(root);

	});

});