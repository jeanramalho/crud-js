var db = openDatabase('dbTeste', '1.0', 'Banco de Dados Teste', 2 * 1024 + 1024)

db.transaction(function(tx){
    tx.executeSql('CREATE TABLE teste (ID PRIMARY KEY, name TEXT)')
})