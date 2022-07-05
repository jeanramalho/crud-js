//adiciona evento para que quando a página for carregada chamar a função carregado
window.addEventListener('load', carregado)

//insere a configuração do banco de dados em uma variável
var db = openDatabase('dbTeste', '1.0', 'Banco de Dados Teste', 2 * 1024 + 1024)

//O db.transaction sempre tem que ser executado para chamar um comando SQL
//cria uma tabela com os devidos campos
db.transaction(function(tx){
    tx.executeSql('CREATE TABLE nomes ( ID INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT)')
})

//função carregado, que é chamada no carregamento da página
//atribui a função salvar ao botão de salvar
//chama a função mostrar, para que seja sempre atualizado a exibição ao carregar a página
function carregado() {
    document.getElementById('salvar').addEventListener('click', salvar)
    mostrar()
}

//função que salva ou atualiza as informações no banco de dados
//chama a função mostrar para que seja atualizada a exibição da tabela assim que forem salvas novas informações
//chama a função limpa para que sejam limpos os campos onde foram digitados as informações
function salvar() {

   var ID = document.getElementById('field-id').value
   var nome = document.getElementById('nome').value
   var sobrenome = document.getElementById('sobrenome').value

   db.transaction(function(tx){
        if(ID){
            tx.executeSql('UPDATE nomes SET nome=?, sobrenome=? WHERE ID=?', [nome, sobrenome, ID], null)
        }else{
            tx.executeSql('INSERT INTO nomes (nome, sobrenome) VALUES (?, ?)', [nome,sobrenome])
        }
   })

   mostrar()
   limpa()
}


//realiza um select no banco de dados para a exibição do conteudo na tela
function mostrar() {
    var tabela = document.getElementById('reg')

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM nomes', [], function(tx, resultado){
            var rows = resultado.rows
            var tr = ''
            for(let i = 0; i < rows.length; i++) {
                tr += `<tr>
                    <td onClick="atualizar(${rows[i].ID})">${rows[i].nome}</td>
                    <td>${rows[i].sobrenome}</td>
                </tr>`
            }

            tabela.innerHTML = tr
        })
    }, null)
}

//pega o id do item selecionado exibi os dados e os atualiza
function atualizar(_id){
    console.log(_id)
    var ID = document.getElementById('field-id')
    var nome = document.getElementById('nome')
    var sobrenome = document.getElementById('sobrenome')

    ID.value = _id

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM nomes WHERE ID=?', [_id], function(tx, resultado) {
            var rows = resultado.rows[0]
            console.log(resultado)

            nome.value = rows.nome
            sobrenome.value = rows.sobrenome

        })
    })
}

//realiza o delete da linha selecionada
function deletar(){
    var id = document.getElementById('field-id').value
    db.transaction(function(tx){
        tx.executeSql('DELETE FROM nomes WHERE ID=?',[id])
    })
    mostrar()
    limpa()
}

//limpa os campos onde foram inseridos as informações
function limpa() {
    var nome = document.getElementById('nome')
    var sobrenome = document.getElementById('sobrenome')

    nome.value = ""
    sobrenome.value = ""
}