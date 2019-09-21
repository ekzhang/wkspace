wkspace
=======

Online competitive programming workspace, built with a MongoDB/Node/Express/React stack.

Has support for auto-saving, workspace sharing, parsing of Codeforces problems, and automatic testing on provided sample data.

## Scripts
Run with `npm run dev`.

In production, run `npm install && npm start` in the `client` directory to compile the React templates. Then, in the base directory, run `npm start` with the proper setting for the `MONGODB_URI` environment variable.
