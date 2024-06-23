const Configuracao = require('../models/configuracoesModel');
const OpcaoMenu = require('../models/opcoesMenuModel');
const RespostaOpcao = require('../models/respostasOpcaoModel');
const InteracaoResposta = require('../models/interacoesRespostaModel');

// Função para salvar as configurações
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
    // Cria uma transação para garantir a consistência dos dados
    const transaction = await sequelize.transaction();

    // Salva a configuração principal
    const configuracao = await Configuracao.create({
      saudacao,
      mensagemPadrao,
      tempoResposta,
      tempoEsperaRepeticao,
      responderPara
    }, { transaction });

    // Salva as opções de menu
    await Promise.all(opcoesMenu.map(async (opcao) => {
      const opcaoSalva = await OpcaoMenu.create({
        textoOpcao: opcao.texto
      }, { transaction });

      // Salva as respostas para a opção
      await Promise.all(opcao.respostas.map(async (resposta) => {
        const respostaSalva = await RespostaOpcao.create({
          textoResposta: resposta.texto,
          id_opcao: opcaoSalva.id
        }, { transaction });

        // Salva as interações para a resposta
        await Promise.all(resposta.interacoes.map(async (interacao) => {
          await InteracaoResposta.create({
            textoInteracao: interacao,
            id_resposta: respostaSalva.id
          }, { transaction });
        }));
      }));
    }));

    // Finaliza a transação
    await transaction.commit();

    res.status(200).json({ message: 'Configurações salvas com sucesso!' });
  } catch (error) {
    // Se houver algum erro, desfaz a transação e retorna o erro
    console.error('Erro ao salvar configurações:', error);
    await transaction.rollback();
    res.status(500).json({ error: 'Erro ao salvar configurações. Verifique o console para mais detalhes.' });
  }
};
