# News App
It shows News of different Countries, Top-Headlines and news from Everywhere.
#### This website is made using
- Reactjs
- Tailwind CSS
- Express 
- External API from <a href="https://newsapi.org">newsapi.org</a>

## How to setup this project
- Clone the repository.

#### Install the client side dependencies.
- Open a terminal in the root directory of the project.

```
cd client/
npm install
npm run dev
```
- In Case of CORS error, Add the following line in the package.json file -:

```
  "proxy": "http://localhost:3000",
```

#### Install the server side dependencies

- Open a new Terminal in the root directory of the project

```
cd server/
npm install
```

- Get the API Key from <a href="newsapi.org">newsapi.org</a>.
- Create a file named <strong>.env</strong> inside server folder
- Add the following in the .env file -:
```
API_KEY = <Your API Key>
```
- Now run the command to run the project-: 
```
npm start
```


# Thank you (●'◡'●)
