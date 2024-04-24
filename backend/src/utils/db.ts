import { connect, connection } from "mongoose";

export async function connectToDb() {
  try {
    await connect(process.env.MONGOURI);

  } catch (error) {
    console.log("Error:", error);
  }
}


connection.on("connected", () => {
  console.log("Mongodb connected to:", connection.db.databaseName);
});

connection.on("error", (error) => {
  console.error("error", error);
  setTimeout(() => {
    connectToDb()
  }, 2000);
});

connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});