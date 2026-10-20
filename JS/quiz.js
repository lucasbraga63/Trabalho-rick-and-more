let nAcerto = 0
let QuestaoAtual = 0
let QuestaoJson = []

async function InciarQuestao()
{
    const resultado = await fetch("/JSON/BancoDeDadosquiz.json")
    
    const dados = await resultado.json()
    console.log(dados);
    
}
function Selecionar()
{
    
}
InciarQuestao()