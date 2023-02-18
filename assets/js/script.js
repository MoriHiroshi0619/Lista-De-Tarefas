let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('.btn-add-tarefa');
let listaTarefas = document.querySelector('.listaTarefas');
let janenaEditFundo = document.querySelector('#janelaEditFundo');
let jenalaEdit = document.querySelector('#janelaEdit');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let mainListaTarefa = document.querySelector('.main');

const maxIdDisponivels = Number.MAX_VALUE;
const key_code_enter = 13;

let bdTarefas = [];

obterTarefasLocalStorage();
renderTarefas();

inputNovaTarefa.addEventListener('keypress', (e) => {
    if(inputNovaTarefa.value.length == 0){
        return;
    }
    if(e.keyCode == key_code_enter){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarIdv2(),
        }
        adiconarTarefa(tarefa);
    }
})

btnAddTarefa.addEventListener('click', () => {
    if(inputNovaTarefa.value.length == 0){
        return;
    }
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarIdv2(),
    }
    adiconarTarefa(tarefa);
})

function adiconarTarefa(tarefa){
    bdTarefas.push(tarefa);
    salavrTarefasLocalStorage();
    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';

    let maxScroll = mainListaTarefa.scrollHeight;
    mainListaTarefa.scrollTop = maxScroll;
}

function criarTagLi(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerText = tarefa.nome;
    li.appendChild(span);

    let div = document.createElement('div');
    li.appendChild(div);

    let btn1 = document.createElement('button');
    btn1.classList.add('btn-controle');
    btn1.setAttribute('onclick', 'editar('+tarefa.id+')');
    let btn2 = document.createElement('button');
    btn2.setAttribute('onclick', 'deletar('+tarefa.id+')');
    btn2.classList.add('btn-controle');

    let imgEdit = document.createElement('img');
    let imgDelete = document.createElement('img');

    imgEdit.src = './assets/icons/edit.png';
    imgDelete.src = './assets/icons/delete.png';

    btn1.appendChild(imgEdit);
    btn2.appendChild(imgDelete);

    div.appendChild(btn1);
    div.appendChild(btn2);

    return li;
}

function editar(idTarefa){
    let li = document.getElementById(idTarefa);
    if(li){
        janenaEditFundo.classList.add('abrir');
        jenalaEdit.classList.add('abrir');

        let inputEdit = document.querySelector('#inputEdit');
        inputEdit.value = li.innerText;

        idTarefaEdicao.innerHTML = '#' + idTarefa;

        let fechar = document.querySelector('.btn-fechar');
        fechar.setAttribute('onclick', 'fecharJanelaEdit()');

        let salvar = document.querySelector('#btn-salvar');

        salvar.addEventListener('click', (e) => {
            e.preventDefault();
            let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');
            let tarefa = {
                nome: inputEdit.value,
                id: idTarefa,
            }
            let tarefaAtual = document.getElementById(idTarefa);

            if(tarefaAtual){
                let li = criarTagLi(tarefa);
                listaTarefas.replaceChild(li, tarefaAtual);
                fecharJanelaEdit();
            }
        })

    }else{
        alert('elemento HTMl não encontrado')
    }
}


function fecharJanelaEdit(){
    janenaEditFundo.classList.remove('abrir');
    jenalaEdit.classList.remove('abrir');
}


function deletar(idTarefa){
    let confirma = window.confirm('Tem certeza que deseja excluir?')
    if(confirma){
        //debugger;
        let indiceTarefa = bdTarefas.findIndex(t => t.id == idTarefa);
        if(indiceTarefa > -1){
            bdTarefas.splice(indiceTarefa, 1);
            salavrTarefasLocalStorage();
        }else{
            throw new Error('id da tarefa não encontrada:', idTarefa);
        }

        let li = document.getElementById(idTarefa);
        if(li){
            listaTarefas.removeChild(li);
        }
        else{
            alert('elemento HTMl não encontrado')
        }
    }
}

function gerarId(){
    return Math.floor(Math.random() * maxIdDisponivels);
}

function gerarIdv2(){
    return gerarIdUnico(); 
}

function gerarIdUnico(){

    //debugger;
    let itensDaLista = document.querySelector('.listaTarefas').children;
    let idsGerados = [];

    for(let i = 0; i < itensDaLista.length; i++){
        idsGerados.push(itensDaLista[i].id);
    }

    let contadorIds = 0;
    let id = gerarId();

    while(contadorIds <= maxIdDisponivels && idsGerados.indexOf(id.toString()) > -1){
        id = gerarId();
        contadorIds++;

        if(contadorIds > maxIdDisponivels){
            alert("ops, ficamos sem IDs :/")
            throw new Error("acabou os IDs :/");
        }
    }

    //let id = gerarId();
    //if(idsGerados.indexOf(id.toString()) > -1){
    //    return gerarIdUnico();
    //}

    return id;
}

function renderTarefas(){
    listaTarefas.innerHTML = "";
    for(let i = 0; i < bdTarefas.length ; i++){
        let li = criarTagLi(bdTarefas[i]);
        listaTarefas.appendChild(li);
    }

    inputNovaTarefa.value = '';
}

function salavrTarefasLocalStorage(){
    localStorage.setItem('listaDeTarefas', JSON.stringify(bdTarefas));
}

function obterTarefasLocalStorage(){
    if(localStorage.getItem('listaDeTarefas')){
        bdTarefas = JSON.parse(localStorage.getItem('listaDeTarefas'))
    }
}



















