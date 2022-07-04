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
}

function mostrar() {
    var tabela = document.getElementById('reg')

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM nomes', [], function(tx, resultado){
            var rows = resultado.rows
            var tr = ''
            for(let i = 0; i < rows.length; i++) {
                tr += '<tr>';
                tr += '<td onClick="atualizar(' + rows[i].ID + ')">' + rows[i].nome + '</td>';
                tr += '<td>' + rows[i].sobrenome + '</td>'
                tr += '</tr>'; 
            }

            tabela.innerHTML = tr
        })
    }, null)
}

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