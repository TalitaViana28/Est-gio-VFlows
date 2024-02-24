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

/*Cálculo valor total Produto*/
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

    // Extrair os valores dos campos do fornecedor
    var razaoSocial = $('#razaoSocial').val();
    var cnpj = $('#cnpj').val();
    var nomeFantasia = $('#nome').val();
    var inscricaoEstadual = $('#inscricaoEstadual').val();
    var cep = $('#cep').val();
    var inscricaoMunicipal = $('#inscricaoMunicipal').val();
    var endereco = $('#endereco').val();
    var numero = $('#numero').val();
    var complemento = $('#complemento').val();
    var bairro = $('#bairro').val();
    var municipio = $('#municipio').val();
    var estado = $('#estado').val();
    var nomeContato = $('#nomeContato').val();
    var telefoneContato = $('#telefoneContato').val();
    var emailContato = $('#emailContato').val();

    // Construir objeto do fornecedor
    var fornecedor = {
      razaoSocial: razaoSocial,
      cnpj: cnpj,
      nomeFantasia: nomeFantasia,
      inscricaoEstadual: inscricaoEstadual,
      cep: cep,
      inscricaoMunicipal: inscricaoMunicipal,
      endereco: endereco,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      municipio: municipio,
      estado: estado,
      nomeContato: nomeContato,
      telefoneContato: telefoneContato,
      emailContato: emailContato,
    };

    // Extrair os valores dos campos dos produtos
    var produtos = [];
    $('.produto-1').each(function (index) {
      var descricao = $(this).find('.descricao').val();
      var opcoes = $(this).find('.opcoes').val();
      var estoque = $(this).find('.estoque').val();
      var valorUnitario = $(this).find('.valor-unitario').val();
      var valorTotal = $(this).find('.valor-total').val();

      var produto = {
        indice: index + 1,
        descricaoProduto: descricao,
        unidadeMedida: opcoes,
        qtdeEstoque: estoque,
        valorUnitario: valorUnitario,
        valorTotal: valorTotal,
      };

      produtos.push(produto);
    });

    // Construir objeto do JSON
    var dados = {
      fornecedor: fornecedor,
      produtos: produtos,
    };

    // Enviar dados para o servidor
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

/* Adicionar função ao adicionarProduto*/
$(document).ready(function () {
  var produtoIndex = 2; // Começando com 2, já que temos produtos 1 e 2 no HTML

  $('#adicionarProduto').click(function (e) {
    e.preventDefault();

    var novoProdutoHtml = `
      <div class="produto-${produtoIndex}">
        <!-- Campos do novo produto -->
        <!-- ... -->
      </div>
    `;

    $('#formularioProdutos').append(novoProdutoHtml);
    produtoIndex++;
  });

  $('#salvarFornecedorBtn').click(function (e) {
    e.preventDefault();

    // Aqui você pode obter os dados de todos os produtos adicionados dinamicamente
    var produtos = [];
    $('.form-produtos').each(function (index, form) {
      var produto = {
        indice: index + 1,
        descricaoProduto: $(form).find('.descricao').val(),
        unidadeMedida: $(form).find('.opcoes').val(),
        qtdeEstoque: $(form).find('.estoque').val(),
        valorUnitario: $(form).find('.valor-unitario').val(),
        valorTotal: $(form).find('.valor-total').val(),
      };
      produtos.push(produto);
    });

    var dados = {
      // Seus dados do fornecedor
      produtos: produtos,
      // Seus dados de anexos
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
