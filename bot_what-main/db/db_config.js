const db = require('../db/db_config');

// Função para salvar as configurações no banco de dados
exports.salvarConfiguracoes = async (req, res) => {
  const {
    saudacao,
    mensagemPadrao,
    tempoResposta,
    tempoEsperaRepeticao,
    responderPara,
    opcoesMenu
  } = req.body;

  try {
    // Iniciar uma transação para garantir consistência
    const connection = await db.getConnection();
    await connection.beginTransaction();

    // Inserir configurações gerais na tabela configuracoes_bot
    const [resultConfiguracoes] = await connection.query(
      'INSERT INTO configuracoes_bot (saudacao, mensagem_padrao, tempo_resposta, tempo_espera_repeticao, responder_para) VALUES (?, ?, ?, ?, ?)',
      [saudacao, mensagemPadrao, tempoResposta, tempoEsperaRepeticao, responderPara]
    );

    const configuracaoId = resultConfiguracoes.insertId;

    // Inserir opções do menu na tabela opcoes_menu
    for (const opcao of opcoesMenu) {
      const [resultOpcao] = await connection.query(
        'INSERT INTO opcoes_menu (id_configuracao, texto_opcao) VALUES (?, ?)',
        [configuracaoId, opcao.texto]
      );

      const opcaoId = resultOpcao.insertId;

      // Inserir respostas para cada opção na tabela respostas_opcao
      for (const resposta of opcao.respostas) {
        const [resultResposta] = await connection.query(
          'INSERT INTO respostas_opcao (id_opcao, texto_resposta) VALUES (?, ?)',
          [opcaoId, resposta.texto]
        );

        const respostaId = resultResposta.insertId;

        // Inserir interações para cada resposta na tabela interacoes_resposta
        for (const interacao of resposta.interacoes) {
          await connection.query(
            'INSERT INTO interacoes_resposta (id_resposta, texto_interacao) VALUES (?, ?)',
            [respostaId, interacao]
          );
        }
      }
    }

    // Commit da transação
    await connection.commit();
    connection.release();

    res.status(201).json({ message: 'Configurações salvas com sucesso!' });
  } catch (error) {
    // Rollback da transação em caso de erro
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error('Erro ao salvar configurações:', error);
    res.status(500).json({ message: 'Erro ao salvar configurações. Verifique o console para mais detalhes.' });
  }
};
