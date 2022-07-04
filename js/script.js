window.addEventListener('load', carregado)

var db = openDatabase('dbTeste', '1.0', 'Banco de Dados Teste', 2 * 1024 + 1024)

db.transaction(function(tx){
    tx.executeSql('CREATE TABLE nomes ( ID INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT)')
})

function carregado() {
    document.getElementById('salvar').addEventListener('click', salvar)
    mostrar()
}

function salvar() {
   var nome = document.getElementById('nome').value
   var sobrenome = document.getElementById('sobrenome').value

   db.transaction(function(tx){
        tx.executeSql('INSERT INTO nomes (nome, sobrenome) VALUES (?, ?)', [nome,sobrenome])
   })

   mostrar()
}

function mostrar() {
    var tabela = document.getElementById('reg')

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM nomes', [], function(tx, resultado){
            var rows = resultado.rows
            var tr = ''
            for(let i = 0; i < rows.length; i++) {
                tr += `<tr>
                    <td>${rows[i].nome}</td>
                    <td>${rows[i].sobrenome}</td>
                </tr>`
            }

            tabela.innerHTML = tr
        })
    }, null)
}