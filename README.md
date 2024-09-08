steps to run this project
**_ 1 - open the folder in terminal _**
**_2 - run docker-compose_**

```bash
docker-compose up
```

**_3 - go to localhost:5050 and create a new db called postgres_**
**_! - it will run fine since i will be including .env files on my repo_**

**_4 - run server and create db tables_**

```bash
cd server
npm install
npx prisma db push
npm run dev
```

**_5 - run client_**

```bash
cd client
npm install
npm run dev
```

**_6 - optional - seed db_**

```bash
cd server
npx prisma db seed
```
