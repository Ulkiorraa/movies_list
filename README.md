# MoviesLib - Uma Aplicação de Filmes

MoviesLib é uma aplicação web de catálogo de filmes desenvolvida em React com a ajuda do Vite que oferece uma experiência completa de exploração e descoberta de filmes populares. A aplicação utiliza a API do The Movie Database (TMDb) para obter informações atualizadas sobre filmes, incluindo títulos, cartazes, descrições, classificações e muito mais.

## Recursos Principais

### Exploração de Filmes
- **Página Inicial:** Na página inicial, você encontrará uma lista dos melhores filmes disponíveis, com a capacidade de filtrá-los por gênero. A aplicação utiliza React para criar uma interface de usuário responsiva e amigável, tornando a navegação intuitiva.

- **Detalhes do Filme:** Ao clicar em um filme específico, você será direcionado para uma página de detalhes do filme. Esta página exibe informações detalhadas, como orçamento, receita, duração e descrição. As informações são recuperadas da API do TMDb e renderizadas de forma elegante com o React.

### Pesquisa de Filmes
- **Pesquisa:** A barra de pesquisa permite que você encontre filmes por título. A pesquisa é realizada em tempo real à medida que você digita, facilitando a localização de filmes específicos. Os resultados da pesquisa são exibidos em uma lista paginada, tornando a navegação eficiente.

### Gerenciamento de Favoritos
- **Favoritos:** A aplicação permite que você adicione filmes à sua lista de favoritos. Esses filmes podem ser facilmente acessados na página "Meus Favoritos". A lista de favoritos é exibida em ordem decrescente de classificações dos filmes.

### Navegação Intuitiva
- **Barra de Navegação:** A aplicação possui uma barra de navegação que facilita a transição entre as diferentes seções da aplicação, como a página inicial, a página de pesquisa e a página de favoritos. O React Router é usado para gerenciar a navegação entre as páginas.

## Tecnologias Utilizadas

MoviesLib foi desenvolvida utilizando várias tecnologias e bibliotecas modernas, incluindo:

- **React:** A aplicação é construída com o React, uma biblioteca JavaScript de código aberto para a criação de interfaces de usuário interativas e eficientes. O React permite a criação de componentes reutilizáveis para uma organização de código limpa e manutenível.

- **Vite:** O Vite é um construtor de aplicações extremamente rápido e flexível que foi usado para configurar o ambiente de desenvolvimento. Ele oferece um tempo de compilação muito rápido e recarregamento a quente (hot reloading) para uma experiência de desenvolvimento eficiente.

- **React Router:** O React Router é utilizado para gerenciar as rotas da aplicação, permitindo a criação de páginas e a navegação entre elas de forma dinâmica e amigável ao usuário.

- **API do The Movie Database (TMDb):** A aplicação faz chamadas à API do TMDb para obter informações sobre filmes, incluindo detalhes, classificações e imagens. O Axios é usado para realizar solicitações HTTP para a API.

- **LocalStorage:** Para armazenar a lista de filmes favoritos do usuário, a aplicação utiliza o LocalStorage do navegador para persistir os dados localmente.

## Como Iniciar a Aplicação

Para utilizar esta aplicação, você precisará obter uma chave de API do The Movie Database (TMDb) e configurá-la como a variável de ambiente `VITE_API_KEY` no arquivo `.env`.

Certifique-se de que o Node.js e o npm estão instalados em seu ambiente de desenvolvimento. Para executar a aplicação localmente, siga estas etapas:

1. Clone o repositório para o seu ambiente de desenvolvimento.

2. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:

npm install

3. Após a instalação das dependências, inicie a aplicação com o seguinte comando:

npm start

4. Acesse a aplicação em seu navegador no endereço `http://localhost:3000`.

## Contribuições

Contribuições são bem-vindas! Se você quiser contribuir para este projeto, siga as diretrizes de contribuição e envie um pull request.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).

Desfrute da experiência de descoberta de filmes com MoviesLib!