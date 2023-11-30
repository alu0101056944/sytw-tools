# Using Parcel

I copied all the files from [../gulp](../gulp), removed the gulp files, removed the gulp dependencies on `package.json`.

Then [createapp.dev](https://createapp.dev/parcel/no-library) was used as reference for the new `package.json` script after deleting the gulp ones.

The command `npm i -D parcel-bundler` is performed to get parcel.

After running `npm run build-prod` the final webpage is at `dist/`.

Using `gh-pages` and the `--public-url` parcel build option, a github webpage was deployed. It is done by executing first `npm run build` and then `npm run deploy`.
