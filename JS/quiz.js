let nAcerto = 0
let QuestaoAtual = 0
let QuestaoJson = []
const TituloQuestao = document.getElementById("titulo")
async function InciarQuestao() {
    const resultado = await fetch("/JSON/BancoDeDadosquiz.json")

    const dados = await resultado.json()
    console.log(dados);
    QuestaoJson = await dados
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
        console.log(QuestaoJson);
        
        ExibirQuestao()

}
function ExibirQuestao()
{
    TituloQuestao.textContent = QuestaoJson[QuestaoAtual].pergunta
    QuestaoJson[QuestaoAtual].opcoes.forEach(element => {
        
    });
}
function SelecionarResposta(butao) {

}
InciarQuestao()