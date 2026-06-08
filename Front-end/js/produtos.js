const listaProdutos = document.getElementById("listaProdutos");
const statusProdutos = document.getElementById("statusProdutos");
const buscaProduto = document.getElementById("buscaProduto");
const filtros = document.querySelectorAll(".filter");
const totalProdutos = document.getElementById("totalProdutos");
const totalEstoque = document.getElementById("totalEstoque");
const totalCategorias = document.getElementById("totalCategorias");
/* Testando erro com protocolo Live Server (estava usando file, quando deveria ser 'http') ->>
const endpointProdutos = window.location.protocol === "file:"
    ? "http://localhost:8080/produto"
    : "/produto";
*/ 
// Forma com localhosto e http ->>
const endpointProdutos = "http://localhost:8080/produto";
// deu certo, era esse o problema :)
const imagensCategoria = {
    "Ração": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    "Petiscos": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    "Farmácia": "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=900&q=80",
    "Brinquedos": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80",
    "Limpeza": "img/higiene-pets.png",
    "Coleiras": "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    "Acessórios": "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    "Roupas": "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=900&q=80"
};

let produtos = [];
let categoriaAtual = "todos";

function formatarPreco(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(Number.isFinite(Number(valor)) ? Number(valor) : 0);
}

function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function textoProduto(produto) {
    return [
        produto.nomeProduto,
        produto.marca,
        produto.categoria,
        produto.descricaoProduto,
        produto.vendedor
    ].join(" ");
}

function imagemDoProduto(produto) {
    return produto.foto || imagensCategoria[produto.categoria] || "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80";
}

function classeEstoque(quantidade) {
    if (quantidade <= 0) return "empty";
    if (quantidade <= 5) return "low";
    return "";
}

function textoEstoque(quantidade) {
    if (quantidade <= 0) return "Sem estoque";
    if (quantidade === 1) return "1 unidade";
    return `${quantidade} unidades`;
}

function atualizarResumo(lista) {
    const categorias = new Set(produtos.map((produto) => produto.categoria).filter(Boolean));
    const estoque = produtos.reduce((total, produto) => total + Number(produto.quantidade || 0), 0);

    totalProdutos.textContent = produtos.length;
    totalEstoque.textContent = estoque;
    totalCategorias.textContent = categorias.size;

    if (lista.length === produtos.length) return;
    statusProdutos.textContent = `${lista.length} produto(s) encontrados.`;
}

//Coloquei o botão de excluir no final dessa função no card
function criarCard(produto) {
    const card = document.createElement("article");
    card.className = "product-card";

    const quantidade = Number(produto.quantidade || 0);
    const categoria = produto.categoria || "Categoria";

    card.innerHTML = `
        <img src="${imagemDoProduto(produto)}" alt="${produto.nomeProduto || "Produto pet"}">
        <div class="product-info">
            <span class="product-category">${categoria}</span>
            <h2>${produto.nomeProduto || "Produto sem nome"}</h2>
            <p class="product-brand">${produto.marca || "Marca nao informada"}</p>
            <p class="product-description">${produto.descricaoProduto || "Sem descricao cadastrada."}</p>
            <p class="product-seller">Vendedor: ${produto.vendedor || "Nao informado"}</p>
            <div class="product-footer">
                <strong class="price">${formatarPreco(produto.preco)}</strong>
                <span class="stock ${classeEstoque(quantidade)}">${textoEstoque(quantidade)}</span>
            </div>
            <div>
                <br><button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">

                    <i class="bi bi-trash"></i>

                </button>

            </div>
        </div>
    `;

    const imagem = card.querySelector("img");
    imagem.addEventListener("error", () => {
        imagem.src = imagensCategoria[categoria] || "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80";
    }, { once: true });

    return card;
}

function filtrarProdutos() {
    const termo = normalizar(buscaProduto.value);

    return produtos.filter((produto) => {
        const bateCategoria = categoriaAtual === "todos" || produto.categoria === categoriaAtual;
        const bateBusca = !termo || normalizar(textoProduto(produto)).includes(termo);
        return bateCategoria && bateBusca;
    });
}

function renderizarProdutos() {
    const lista = filtrarProdutos();
    listaProdutos.innerHTML = "";
    atualizarResumo(lista);

    if (!produtos.length) {
        statusProdutos.textContent = "Nenhum produto cadastrado ainda.";
        statusProdutos.className = "status empty";
        return;
    }

    if (!lista.length) {
        statusProdutos.textContent = "Nenhum produto encontrado com esse filtro.";
        statusProdutos.className = "status empty";
        return;
    }

    statusProdutos.textContent = `${lista.length} produto(s) exibidos.`;
    statusProdutos.className = "status";

    const fragmento = document.createDocumentFragment();
    lista.forEach((produto) => fragmento.appendChild(criarCard(produto)));
    listaProdutos.appendChild(fragmento);
}

async function carregarProdutos() {
    
    try {
    /* Testanto erros
        const resposta = await fetch(endpointProdutos);
    */
        console.log(endpointProdutos);
        const resposta = await fetch(endpointProdutos)
        console.log(resposta.status)

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar os produtos.");
        }

        produtos = await resposta.json();
        renderizarProdutos();
    } catch (erro) {
        statusProdutos.textContent = "Nao foi possivel carregar os produtos. Abra a aplicacao Java e acesse produtos.html pelo servidor.";
        statusProdutos.className = "status error";
        listaProdutos.innerHTML = "";
    }
}

//Recarrega a página atualizada automaticamente
function recarregarForcado() {
    location.reload(true);
}

//Função de excluir o produto
function excluirProduto(id) {
    
    fetch(`http://localhost:8080/produto/${id}` , {
        
        method: "DELETE"
    })

     .then(response => {

        if (response.ok){
            Swal.fire({
                title : "ROUPA EXCLUÍDA COM SUCESSO",
                text :  "ROUPA CADASTRADA",
                icon : "success" 
            })
        }   
     
    })

recarregarForcado()
}

buscaProduto.addEventListener("input", renderizarProdutos);

filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtros.forEach((item) => item.classList.remove("active"));
        botao.classList.add("active");
        categoriaAtual = botao.dataset.category;
        renderizarProdutos();
    });
});

carregarProdutos();
