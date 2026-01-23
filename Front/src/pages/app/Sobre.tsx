import { Helmet } from "react-helmet-async";

export function Sobre() {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8">
      <Helmet title="Sobre" />

      {/* Título principal */}
      <h2 className="font-bold text-3xl text-center">
        O que é o PJASistarefas
      </h2>

      {/* Descrição */}
      <div className="max-w-4xl text-justify text-muted-foreground leading-relaxed">
        <p>
          O <strong>PJASistarefas</strong> é um sistema de gestão de tarefas
          desenvolvido pelo <strong>setor de informática em conjunto com o
          Programa de Jovem Aprendiz (PJA)</strong>. Seu principal
          objetivo é acompanhar, organizar e contribuir para o desenvolvimento
          dos jovens por meio do controle de suas atividades diárias.
        </p>

        <br />

        <p>
          A iniciativa teve início a partir de uma planilha em Excel e, com o
          tempo, evoluiu para um sistema robusto de gestão, capaz de centralizar
          informações e gerar análises mais precisas. Atualmente, o
          PJASistarefas permite não apenas a gestão das atividades e do tempo
          dedicado a elas, mas também o acompanhamento da pontualidade,
          presença e desempenho geral dos jovens, servindo como uma importante
          ferramenta de apoio à coordenação do programa.
        </p>
      </div>

      {/* Objetivos */}
      <div className="w-full max-w-4xl bg-card rounded-xl shadow p-6">
        <h3 className="font-semibold text-xl mb-4">Principais Objetivos</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Gerenciar as atividades realizadas pelos jovens aprendizes.</li>
          <li>Acompanhar presença, pontualidade e desempenho.</li>
          <li>Avaliar o desempenho geral de cada jovem de forma contínua.</li>
        </ul>
      </div>

      {/* Funcionalidades */}
      <div className="w-full max-w-4xl bg-card rounded-xl shadow p-6">
        <h3 className="font-semibold text-xl mb-6">Funcionalidades</h3>

        {/* Gestão de Atividades */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">
            Gestão de Atividades
          </h4>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              Cada jovem pode cadastrar suas atividades, informando o tempo
              gasto em cada uma delas.
            </li>
            <li>
              Acompanhamento do volume de atividades realizadas ao longo do
              tempo.
            </li>
          </ul>
        </div>

        {/* Análise de Desempenho */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">
            Análise de Desempenho
          </h4>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Coleta mensal de dados.</li>
            <li>Cruzamento de informações provenientes de:</li>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Controle de presença e ponto.</li>
              <li>Plataforma educacional.</li>
            </ul>
            <li>Geração de indicadores de desempenho geral.</li>
            <li>
              Base para critérios de avaliação, como selos, classificações e
              análises comparativas.
            </li>
          </ul>
        </div>

        {/* Visualização de Dados */}
        <div>
          <h4 className="font-semibold text-lg mb-2">
            Visualização de Dados
          </h4>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Dashboards com métricas gerais de atividades.</li>
            <li>Percentual de participação nas atividades.</li>
            <li>
              Análise temporal que permite visualizar a evolução do jovem ao
              longo do período de contrato.
            </li>
          </ul>
        </div>
      </div>

      {/* Resumo final */}
      <div className="max-w-4xl text-center text-muted-foreground">
        <p>
          Em resumo, o <strong>PJASistarefas</strong> tem como foco apoiar a
          capacitação e o desenvolvimento dos jovens aprendizes, ao mesmo tempo
          em que oferece à coordenação do programa uma visão clara e objetiva
          para identificar pontos de melhoria e acompanhar a evolução de cada
          participante.
        </p>
      </div>
    </div>
  )
}