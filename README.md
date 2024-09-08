steps to run this project
1 - open the folder in terminal

2 - run docker-compose

```bash
docker-compose up
```

3 - go to localhost:5050 and create a new db called postgres

! - it will run fine since i will be including .env files on my repo

4 - run server and create db tables

```bash
cd server
npm install
npx prisma db push
npm run dev
```

5 - run client

```bash
cd client
npm install
npm run dev
```

6 - optional - seed db

```bash
cd server
npx prisma db seed
```
