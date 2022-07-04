window.addEventListener('load', carregado)

var db = openDatabase('dbTeste', '1.0', 'Banco de Dados Teste', 2 * 1024 + 1024)

db.transaction(function(tx){
    tx.executeSql('CREATE TABLE nomes (ID PRIMARY KEY, nome TEXT, sobrenome TEXT)')
})

function carregado() {
    document.getElementById('salvar').addEventListener('click', salvar)
}

function salvar() {
   var nome = document.getElementById('nome').value
   var sobrenome = document.getElementById('sobrenome').value

   db.transaction(function(tx){
        tx.executeSql('INSERT INTO nomes (nome, sobrenome) VALUES (?, ?)', [nome,sobrenome])
   })
}