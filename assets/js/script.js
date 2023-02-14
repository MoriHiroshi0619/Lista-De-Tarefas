let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('.btn-add-tarefa');
let listaTarefas = document.querySelector('.listaTarefas');
let janenaEditFundo = document.querySelector('#janelaEditFundo');
let jenalaEdit = document.querySelector('#janelaEdit');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let mainListaTarefa = document.querySelector('.main');

inputNovaTarefa.addEventListener('keypress', (e) => {
    if(inputNovaTarefa.value.length == 0){
        return;
    }
    if(e.keyCode == 13){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
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
        id: gerarId(),
    }
    adiconarTarefa(tarefa);
})

function adiconarTarefa(tarefa){
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
    return Math.floor(Math.random() * 10000);
}



















