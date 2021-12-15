export const README = `
# Welcome to [[NAME]]'s card

This is my own personal card!

* Made thanks by [card-me](https://github.com/mauro-balades/card-me)
`;

export const PACKAGE = `
{
    "name": "card-[[NAME]]",
    "version": "1.0.0",
    "description": "This is my personal card!",
    "main": "index.js",
    "bin": {
      "card-[[NAME]]": "./index.js"
    },
    "type": "module",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "boxen": "^6.2.1",
      "prompts": "^2.4.2"
    }
  }

`;

export const INDEX = `#!/usr/bin/env node
console.log(\`
[[CARD]]
\`) // DO NOT EDIT
`;
