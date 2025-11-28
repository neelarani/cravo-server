import 'dotenv/config';

import app from './app';
import mongoose from 'mongoose';
import envConfig from './config';

async function main() {
  try {
    await mongoose.connect(`${envConfig.database_url}`);

    app.listen(envConfig.port, () => {
      console.log(`cravo server port is:  ${envConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
