// selecionar os elementos atraves do ID
const campoTarefa = document.getElementById('tarefa');
const botaoAddTarefa = document.getElementById('botao-add-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');


// Função única para salvamento
function salvandoDoLocalSotrage() {
    const tarefas = [];
    document.querySelectorAll('li').forEach(item => {
        tarefas.push(item.textContent);
    });
    localStorage.setItem('tarefas_salvas', JSON.stringify(tarefas));
}


// Cria elementos na tela
function criaElementoNaTela(texto) {
    const novaLinha = document.createElement('li');
    novaLinha.textContent = texto;

    // Clica para marcar como concluida
    novaLinha.addEventListener('click', function(event) {
            event.target.classList.toggle('concluido');
            salvandoDoLocalSotrage();
    });

    // Clica duas vezes para remover a tarefa
    novaLinha.addEventListener('dblclick', function(event) {
        if (event.type === 'dblclick') {
            event.target.remove();
            salvandoDoLocalSotrage();
        };
    });
    listaTarefas.appendChild(novaLinha);
}


// Lógica do botão adicionar
function adicionarTarefa() {
    const valor = campoTarefa.value.trim();
    if (valor === '') {
        return;
    }
    criaElementoNaTela(valor);
    salvandoDoLocalSotrage();
    campoTarefa.value = '';
    campoTarefa.focus();
}


// Carregamento inicial do localStorage
function carregarDoLocalStorage() {
    const salvas = localStorage.getItem('tarefas_salvas');
    if (salvas) {
        JSON.parse(salvas).forEach(tarefa => criaElementoNaTela(tarefa));
    }
}
 

// Inicialização e eventos globais
carregarDoLocalStorage();


// Adiciona um evento de clique ao botão para chamar a função de adicionar tarefa
botaoAddTarefa.addEventListener('click', adicionarTarefa);


// Adiciona um evento de teclado para permitir adicionar tarefa precionando Enter
campoTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});