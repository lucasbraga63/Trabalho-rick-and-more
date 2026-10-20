const Busca = document.getElementById("Busca")
const ListaCard = document.getElementById("containerPersonagens")
const AutoCompletar = document.getElementById("AutoCompletar")
const textPag = document.getElementById("TextPagAtual")
let pagAtual = 1
let pagLimite = 42
let temporizador
Busca.addEventListener("keydown", async (event) => {
    if(event.key === 'Enter')
    {
        pesquisar()
    }
    clearTimeout(temporizador)
    temporizador = setTimeout(async () => {
        let resultado = await fetch("/JSON/BancoDeDados.json")
        let dados = await resultado.json()
        console.log(dados);

        const resultadosFiltrados = dados.filter(item =>
            item.toLowerCase().includes(event.target.value)
        );
        AutoCompletar.innerHTML = ''
        for (let index = 0; index < 5; index++) {
            const element = resultadosFiltrados[index];
            if (element) {
                AutoCompletar.innerHTML += `  <option value="${element}"></option>`
            } else {
                return
            }
        }
    }, 300)
})


function Proximapag()
{
    if((pagAtual + 1)< 42)
    {
        pagAtual++
        BuscarPorPag()
        
    }
}
function Voltarpag()
{
    if((pagAtual - 1)> 0)
    {
        pagAtual--
        BuscarPorPag()
    }
}

async function BuscarPorPag() {
    textPag.textContent = `${pagAtual}/${pagLimite}`
    let resultado = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagAtual}`)
    let dados = await resultado.json()
    ListaCard.innerHTML = ''
    dados.results.forEach(element => {
        CriarCard(element)
    });
}

async function pesquisar() {
    let resultado = await fetch(`https://rickandmortyapi.com/api/character/?name=${Busca.value}`)
    let dados = await resultado.json()
        ListaCard.innerHTML = ''

    console.log(dados);
    dados.results.forEach(element => {
        CriarCard(element)
    });

}
function CriarCard(dados) {
   
    ListaCard.innerHTML += `  <div class="cardPersonagem">
                   <div class="imagem">
                    <img src="${dados.image}" alt="imagemPesona">
                   </div>
                   <div class="informacoes">
                   <h3>${dados.name}</h3>
                    <span>${dados.species}</span>
                    <p>${dados.location.name}</p>
                    <p style="background-color: ${dados.status == 'alive'? '':'brown'};">${dados.status}</p>
                    <span>${dados.gender}</span>
                   </div>
                </div>`
                
}
BuscarPorPag()
