<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $dados_brutos = file_get_contents('php://input');

  if ($dados_brutos !== false) {
    $dados = json_decode($dados_brutos, true);
    
    if ($dados !== null) {
      $fornecedor = $dados['fornecedor'];

      $razaoSocial = $fornecedor['razaoSocial'];
      $nomeFantasia = $fornecedor['nomeFantasia'];
      $cnpj = $fornecedor['cnpj'];
      $inscricaoEstadual = $fornecedor['inscricaoEstadual'];
      $inscricaoMunicipal = $fornecedor['inscricaoMunicipal'];
      $nomeContato = $fornecedor['nomeContato'];
      $emailContato = $fornecedor['emailContato'];
      
      $produtos = $dados['produtos'];
      foreach($produtos as $produto) {
        $indice = $produto['indice'];
        $descricaoProduto = $produto['descricaoProduto'];
        $unidadeMedida = $produto['unidadeMedida'];
        $qtdeEstoque = $produto['qtdeEstoque'];
        $valorUnitario = $produto['valorUnitario'];
        $valorTotal = $produto['valorTotal'];
      }

      $resposta = array('mensagem' => 'Dados recebidos com sucesso!');
      echo json_encode($resposta);
    } else {
      http_response_code(400);
      echo json_encode(array('erro' => 'Erro ao decodificar os dados JSON'));
    }
  } else {
    http_response_code(500);
    echo json_encode(array('erro' => 'Erro ao obter os dados da requisição.'));
  }
} else {
  http_response_code(405);
  echo json_encode(array('erro' => 'Método não permitido. Apenas POST é suportado.'));
}
?>
