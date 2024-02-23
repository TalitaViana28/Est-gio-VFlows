/*CEP*/
function buscarCep() {
  var cep = document.getElementById('cep').value;
  fetch('https://viacep.com.br/ws/' + cep + '/json/')
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('endereco').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('municipio').value = data.localidade;
      document.getElementById('estado').value = data.uf;
    })
    .catch((error) => console.error('Erro ao buscar CEP:', error));
}

/*Cálculo valor total Produto-1*/
function calcularValorTotal(estoqueId, valorUnitarioId, valorTotalId) {
  var estoque = parseFloat(document.getElementById(estoqueId).value);
  var valorUnitario = parseFloat(
    document.getElementById(valorUnitarioId).value,
  );
  var valorTotal = estoque * valorUnitario;

  var valorTotalFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  document.getElementById(valorTotalId).value = isNaN(valorTotal)
    ? ''
    : valorTotalFormatado;
}

document.getElementById('estoque1').addEventListener('input', function () {
  calcularValorTotal('estoque1', 'valorUnitario1', 'valorTotal1');
});

document
  .getElementById('valorUnitario1')
  .addEventListener('input', function () {
    calcularValorTotal('estoque1', 'valorUnitario1', 'valorTotal1');
  });
calcularValorTotal('estoque1', 'valorUnitario1', 'valorTotal1');

document.getElementById('estoque2').addEventListener('input', function () {
  calcularValorTotal('estoque2', 'valorUnitario2', 'valorTotal2');
});

document
  .getElementById('valorUnitario2')
  .addEventListener('input', function () {
    calcularValorTotal('estoque2', 'valorUnitario2', 'valorTotal2');
  });
calcularValorTotal('estoque2', 'valorUnitario2', 'valorTotal2');

/*Salvar Fornecedor */
$(document).ready(function () {
  $('#salvarFornecedorBtn').click(function (e) {
    e.preventDefault();

    var dados = {
      usuario: [
        {
          razaoSocial: 'Razao social',
          nomeFantasia: 'Nome Fantasia',
          cnpj: '123456',
          inscricaoEstadual: '123456',
          inscricaoMunicipal: '123456',
          nomeContato: 'Nome contato',
          telefoneContato: 'email@email.com',
        },
      ],
      produtos: [
        {
          indice: 1,
          descricaoProduto: 'Descrição produto',
          unidadeMedida: 'unidadeMedida',
          qtdeEstoque: '123',
          valorUnitario: '1554.00',
          valorTotal: '2555.00',
        },
        {
          indice: 2,
          descricaoProduto: 'Descrição produto',
          unidadeMedida: 'unidadeMedida',
          qtdeEstoque: '123',
          valorUnitario: '1554.00',
          valorTotal: '2555.00',
        },
      ],
      anexos: [
        {
          indice: 1,
          nomeArquivo: 'iouahsiuahusihausihiahiuah',
          blobArquivo: 'iouahsiuahusihausihiahiuah',
        },
        {
          indice: 2,
          nomeArquivo: 'iouahsiuahusihausihiahiuah',
          blobArquivo: 'iouahsiuahusihausihiahiuah',
        },
      ],
    };

    $.ajax({
      type: 'POST',
      url: 'processar_formulario.php',
      contentType: 'application/json',
      data: JSON.stringify(dados),
      success: function (response) {
        alert('Fornecedor salvo com sucesso');
      },
      error: function (xhr, status, error) {
        console.log(error);
        alert(
          'Ocorreu um erro ao salvar o fornecedor. Por favor, tente novamente.',
        );
      },
    });
  });
});

/*Arquivos armazenados em blob e session storage*/
function handlefileUpload1(event) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;

    const listaArquivos = document.getElementById('listaArquivos' + (i + 1));

    const paragraph = listaArquivos.querySelector('p#nomeArquivo');

    const div = document.createElement('div');
    div.className = 'documento';

    const newParagraph = document.createElement('p');
    newParagraph.textContent = fileName;

    div.appendChild(newParagraph);
    listaArquivos.appendChild(div);

    const blob = new Blob([file], { type: file.type });

    sessionStorage.setItem(
      'anexo' + (i + 1),
      JSON.stringify({
        nome: file.name,
        tipo: file.type,
        blob: blob,
      }),
    );
  }
}

document
  .getElementById('inputArquivo')
  .addEventListener('change', handlefileUpload1);

/* Excluir arquivo clicando na lixeira*/
function excluirArquivo(idListaArquivos, mensagemPadrao) {
  const listaArquivos = document.getElementById(idListaArquivos);
  listaArquivos.innerHTML = '';

  const mensagemPadraoElemento = document.createElement('p');
  mensagemPadraoElemento.textContent = mensagemPadrao;

  listaArquivos.appendChild(mensagemPadraoElemento);
}

/* Baixar arquivo clicando em visualizar*/
function baixarArquivo(elemento) {
  var caminhoArquivo = elemento.getAttribute('data-file');

  var linkDownload = document.createElement('a');
  linkDownload.href = caminhoArquivo;
  linkDownload.download = '';

  document.body.appendChild(linkDownload);
  linkDownload.click();
  document.body.removeChild(linkDownload);
}
