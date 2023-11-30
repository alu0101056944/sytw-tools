# Using Parcel

I copied all the files from [../gulp](../gulp) and removed the gulp files, the gulp dependencies on `package.json`.

[createapp.dev](https://createapp.dev/parcel/no-library) was used as reference for the new `package.json` script after deleting the gulp ones.

The command `npm i -D parcel-bundler` is performed to get parcel.

After running `npm run build-prod` the final webpage is at `dist/`. That's why `http-server` with a `http-server dist/ -c-1 -o` script is added to the project to execute the webpage.
