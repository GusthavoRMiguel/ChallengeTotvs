# WarehouseDelivery

## Instalação

Clone o repositório:io:
   `git clone https://github.com/GusthavoRMiguel/ChallengeTotvs.git`

2. Navegue até o diretório do projeto:
   `cd ChallengeTotvs`

3. Abra o arquivo **index.html** no seu navegador para acessar a página inicial. # ChallengeTotvs


## Link do Site

`https://warehouse-delivery.vercel.app/`

## Descrição

WarehouseDelivery é uma aplicação web para gerenciar o cadastro de filiais e seus respectivos envios e recebimentos. Esta aplicação permite que os usuários cadastrem novas filiais, preencham automaticamente os campos de endereço com base no CEP e gerenciem envios entre filiais.

## Funcionalidades

- **Cadastro de novas filiais**: Permite adicionar novas filiais ao sistema.
- **Validação de código de filial**: Evita duplicações de código de filial.
- **Autenticação**: Verifica se o usuário está autenticado antes de permitir o acesso às funcionalidades.
- **Preenchimento automático de endereço**: Preenche automaticamente os campos de endereço com base no CEP.
- **Gerenciamento de envios e recebimentos**: Gerencia envios e recebimentos entre filiais.
- **Exibição de mensagens**: Exibe mensagens de erro e sucesso usando tooltips e toast do Bootstrap.
- **Paginação**: Suporte para paginação de envios e recebimentos.

## Como Usar

1. **Cadastro de Filiais**: Antes de iniciar os envios e recebimentos, é necessário cadastrar pelo menos duas filiais. Acesse a seção de cadastro de filiais e preencha os dados necessários.
2. **Login**: Para efetuar o login, forneça o código da filial e o código do responsável do almoxarifado previamente cadastrados.
3. **Adicionar Envio**: Preencha o formulário de novo envio e clique em "Adicionar".
4. **Visualizar Envios**: Clique no botão "Envios" para visualizar os envios.
5. **Visualizar Recebimentos**: Clique no botão "Recebimentos" para visualizar os recebimentos.
6. **Confirmar Recebimento**: Clique no botão "Receber" para confirmar um recebimento pendente.
7. **Detalhes**: Clique no botão "Ver Detalhes" para visualizar mais informações sobre um envio ou recebimento.

8. ### Decisões do Projeto

- **Estrutura MVC**: Adotei uma abordagem semelhante ao padrão MVC (Model-View-Controller) para garantir maior modularidade no código. Essa estrutura permite que as diferentes partes da aplicação sejam separadas, facilitando a manutenção e o desenvolvimento de novas funcionalidades.

- **Programação Orientada a Objetos (POO)**: Apliquei princípios de programação orientada a objetos para organizar as classes e objetos do projeto. Isso não apenas promoveu uma estrutura de código mais clara e reutilizável, mas também ajudou na encapsulação de dados e na implementação de lógica específica em cada classe.


### Sugestões Futuras

- **Refatoração do Sistema de Login e Armazenamento**: Uma melhoria futura seria refatorar o sistema de login e armazenamento para permitir conectividade online. Atualmente, o sistema se limita aos dados armazenados no localStorage, o que pode restringir a escalabilidade e a flexibilidade da aplicação.



## Tecnologias Utilizadas

- **HTML**: Estrutura da aplicação.
- **CSS**: Estilização da aplicação.
- **JavaScript**: Lógica de front-end.
- **Bootstrap**: Framework CSS para estilização e componentes UI.
- **LocalStorage**: Armazenamento de dados no navegador.


## Estrutura do Projeto

- **assets/**
  - `homeImg.jpg`
- **css/**
  - `styles.css`
- **js/**
  - **controllers/**
    - `CadastroController.js`
    - `DashboardController.js`
    - `LoginController.js`
  - **models/**
    - `Filial.js`
    - `Toast.js`
    - `Entrega.js`
  - **views/**
    - `CadastroView.js`
    - `DashboardView.js`
    - `LoginView.js`
- [`index.html`]
- [`cadastro.html`]
- [`dashboard.html`]



## Diagrama BPMN

[![Diagrama BPMN](https://via.placeholder.com/150)](https://miro.com/app/live-embed/uXjVLYUBjlQ=/?moveToViewport=1265,-28,3067,3312&embedId=1032483062)

Clique na imagem para visualizar o diagrama BPMN.

