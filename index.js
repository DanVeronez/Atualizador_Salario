var fs = require('fs')

fs.readFile('dados.csv', 'utf-8', (err, data) => {
  
  openFileValidation(err);

  processing(data.split('\n'));

  fileUpdate(conteudoArquivo.join('\n'));
  
});

function openFileValidation(err){
  if (err) {
    console.log("Erro ao abrir arquivo");
    console.log(err);
  }else{
    console.log("Arquivo aberto com sucesso");
  }
}

function processing(conteudoArquivo){
  
  for (var i = 1; i < conteudoArquivo.length; i++) {
    var conteudo = conteudoArquivo[i].split(';')
    var salarioBruto = Number(conteudo[1])
    var salarioTaxa = Number(conteudo[2])

    var salarioLiquido = salarioBruto * ((100 - salarioTaxa) / 100)
    conteudo[3] = salarioLiquido

    var conteudoAtualizado = conteudo.join(';')
    conteudoArquivo[i] = conteudoAtualizado
  }
}

function fileUpdate(conteudoAtualizado){
  fs.writeFile('dados.csv', conteudoAtualizado, 'utf8', (err) => {
    if (err) {
      console.log("Erro ao salvar arquivo");
      rej(err);
    } else {
      console.log("Arquivo salvo com sucesso");
    }
  })
}