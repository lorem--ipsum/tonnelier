import * as glob from 'glob';

export default async function glomise(path: string, options?: glob.IOptions) {
  return new Promise((resolve, reject) => {
    glob(path, options, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  }) as Promise<string[]>;
}
