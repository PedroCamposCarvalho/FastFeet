<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=70px src="FrontEnd/src/assets/fastfeet-logo.png" alt="FastFeet"></a>
</p>

<h3 align="center">By Pedro Carvalho</h3>
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Sumário

- [Sobre](#about)
- [Começando com a aplicação](#getting_started)
- [Iniciando o sistema](#usage)
- [Autor](#authors)

## 🧐 Sobre <a name = "about"></a>

FastFeet é uma transportadora fictícia para a certificação do BootCamp da ROCKETSEAT!

## 🏁  Começando com a aplicação <a name = "getting_started"></a>

### Pré-requisitos

- NodeJS
- Yarn
- PostgreSQL
- MacOS

### Instalação

1. Clone este respositório
2. Dentro do terminal, rode os seguintes comandos nas pastas "Backend", "FrontEnd" e "mobile":
```
yarn
```
3. Dentro da pasta "Backend", abra o arquivo .env e digite suas credenciais de acesso ao banco de dados PostgreSQL e ao servidor de e-mail
4. Rode os seguintes comandos dentro do terminal, na pasta "Backend":
```
yarn sequelize db:create
```
```
yarn sequelize db:migrate
```
5. Caso você deseja rodar o aplicativo em um iPhone físico, certifique-se de que o celular esteja conectado na mesma rede do computador, entre no caminho:
"mobile/services/api.js" e troque a url de "localhost" para o ip do computador.
Caso você queira rodar no próprio emulador, não precisa mudar nada.

Obs: Este aplicativo só funciona para ios

## 🎈 Iniciando o sistema<a name="usage"></a>

Para rodar a aplicação, execute os seguintes passos:
1. Na pasta "Backend", execute o seguinte comando:
```
yarn dev
```
2. Na pasta "FrontEnd", execute o seguinte comando:
```
yarn start
```
3. Na pasta "mobile", execute o seguinte comando:
```
npx react-native run-ios
```

## ✍️ Autor <a name = "authors"></a>

- [Pedro Carvalho](https://github.com/pedrocamposcarvalho)

