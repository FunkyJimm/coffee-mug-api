# coffee-mug-api

Aplikacja stworzona na potrzeby rekrutacji firmy Coffee Mug

## Technologie

NodeJS v14.17.6
TypeScript v4.5.4
Express v4.17.2
Mongoose v6.1.5

## Uruchomienie

Aby uruchomić projekt za pomocą npm używamy następujących komend:
$ npm install
$ npm start

## Endpointy oraz testowanie API

Struktura pliku JSON powinna wyglądać następująco:
{
  "name": "Nazwa produktu",
  "price": 123456
}

### Wyświetlenie listy produktów

GET http://localhost:3000/products/

### Wyświetlenie szczegółów produktu

GET http://localhost:3000/products/productId

### Dodawanie produktów

POST http://localhost:3000/

### Aktualizacja produktów

PUT http://localhost:3000/products/productId

### Usuwanie produktów

DELETE http://localhost:3000/products/productId

## Testowanie aplikacji

Do testowania aplikacji proszę wykorzystać program Postman.