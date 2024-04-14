const menu = document.getElementById("menu");
const cartbtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const finalizarPedido = document.getElementById("finalizar-btn");
const fecharModal = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const endereço = document.getElementById("cart-endereço");
const erroEndereço = document.getElementById("endereço-errado");

let lista = []

//Abrir o Modal do carrinho//
cartbtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
    adicionadoAsacola()
})
//Fechar modal clicando fora da caixa//
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})
fecharModal.addEventListener("click", function () {
    cartModal.style.display = "none"
})
//Achando o botão de adicionar no carrinho, dento do menu//
menu.addEventListener("click", function (event) {
    let adicionar = event.target.closest(".add-td-card-btn")

    if (adicionar) {
        const name = adicionar.getAttribute("data-name");
        const price = parseFloat(adicionar.getAttribute("data-price"))
        adicionarCarrinho(name, price)
    }

})
//Adicionar no carrinho seu produto

function adicionarCarrinho(name, price) {
    const existing = lista.find(event => event.name === name)
    if (existing) {
        existing.quantidade += 1
    } else {
        lista.push({
            name,
            price,
            quantidade: 1,
        })
    }

    //atualizando carrinho com produto adicionado//
    adicionadoAsacola()
}
function adicionadoAsacola() {
    cartItemsContainer.innerHTML = ""
    let total = 0;

    lista.forEach(item => {
        const elementcriado = document.createElement("div");
        elementcriado.classList.add("flex", "justify-between", "mb-4", "flex-col")

        elementcriado.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
        <h4 class="font-bold">${item.name}</h4>
        <p>Quantidade: ${item.quantidade}</p>
        <p class="font-medim mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <div>
        <button class="removerdocarrinho" data-name="${item.name}" >
            Remover
        </button>
        </div>
        </div>`

        total += item.price * item.quantidade

        cartItemsContainer.appendChild(elementcriado)
    })
    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });
    cartCount.innerHTML = lista.length;

}
//Remover produto do carrinho//
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("removerdocarrinho")) {
        const name = event.target.getAttribute("data-name");
        removerdocarrinho(name)
    }
})
function removerdocarrinho(name) {
    const index = lista.findIndex(item => item.name === name);
    if (index !== 1) {
        const item = lista[index]
        if (item.quantidade > 1) {
            item.quantidade -= 1;
            adicionadoAsacola();
            return;
        }
        lista.splice(index, 1);
        adicionadoAsacola();
    }

}

endereço.addEventListener("input", function (event) {
    let valordoInput = event.target.value

    if (valordoInput !== "") {
        endereço.classList.remove("border-red-500")
        erroEndereço.classList.add("hidden")
    }
})


finalizarPedido.addEventListener("click", function (){
    if (lista.length === 0) return;

    if (endereço.value === "") {
        erroEndereço.classList.remove("hidden");
        endereço.classList.add("border-red-500")
        return;
    }
    //Enviando pedido para API WhatsApp//
    const mensagemDoPedido = lista.map(item=>{
        return(
            `${item.name} QUANTIDADE:(${item.quantidade}) Preço do Produto:R$${item.price} |`
            
        )
        
        

    }).join()
    console.log(mensagemDoPedido)
    const mensagemParaWhatsApp= encodeURIComponent(mensagemDoPedido);
    const telefone= "8498979071"
    window.open(`https://wa.me/${telefone}?text=${mensagemParaWhatsApp} Endereço: ${endereço.value}`,"_blank")


})


function buscarHora() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 7 && hora < 19;
}
const spanHora = document.getElementById("spanHora");
const aberto = buscarHora()

if (aberto) {
    spanHora.classList.remove("bg-red-500");
    spanHora.classList.add("bg-green-600");
} else {
    spanHora.classList.remove("bg-green-600");
    spanHora.classList.add("bg-red-500")
}
