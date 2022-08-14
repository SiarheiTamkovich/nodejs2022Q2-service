/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

export async function createFolder(folder) {
  await fs.promises.mkdir(folder, { recursive: true });
  //console.log(`Folder ${folder} created`);
}
