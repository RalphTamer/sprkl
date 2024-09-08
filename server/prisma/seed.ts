import { db } from "../src/utils/db.server";
import { faker } from "@faker-js/faker";
const seed = async () => {
  let i = 0;
  while (i < 20) {
    await db.user.create({
      data: {
        dateOfBirth: faker.date.between({
          from: "1/1/1955",
          to: "1/1/2002",
        }),
        email: faker.internet.email(),
        fullname: faker.person.fullName(),
        username: faker.internet.userName(),
        photo: faker.image.url(),
      },
    });
    i++;
  }
};
seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
