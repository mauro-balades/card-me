import { README, PACKAGE, INDEX } from "./files.js";
import prompts from "prompts";
import boxen from "boxen";
import fs from "fs";
import mkdirp from "mkdirp";

const mkdir_sync = mkdirp.sync;

const get_information = async () => {
    return new Promise(async (resolve, reject) => {
        const response = await prompts([
            {
                type: "text",
                name: "name",
                message: `What's your first name?`,
                validate: (response) =>
                    response.length < 1 ? `Add a valid name` : true,
            },
            {
                type: "select",
                name: "face",
                message: "Pick a face!",
                choices: [
                    { title: "ツ", value: "ツ" },
                    { title: "˙ ͜ʟ˙", value: "˙ ͜ʟ˙" },
                    { title: "╚(ಠ_ಠ)=┐", value: "╚(ಠ_ಠ)=┐" },
                    { title: "(¬_¬)", value: "(¬_¬)" },
                    { title: "｡◕‿◕｡", value: "｡◕‿◕｡" },
                    { title: "ಠ~ಠ", value: "ಠ~ಠ" },
                    { title: "^̮^", value: "^̮^" },
                    { title: "ʕ•ᴥ•ʔ", value: "ʕ•ᴥ•ʔ" },
                ],
            },
            {
                type: "text",
                name: "work",
                message: `In what are you working right now?`,
                initial: null,
            },
            {
                type: "text",
                name: "github",
                message: `What's your GitHub username?`,
                initial: null,
            },
            {
                type: "text",
                name: "devto",
                message: `What is your Dev.to name?`,
                initial: null,
            },
            {
                type: "text",
                name: "linkedIn",
                message: `What is your current LinkedIn profile?`,
                initial: null,
            },
            {
                type: "text",
                name: "twitter",
                message: `What's your twitter handle?`,
                initial: null,
            },
        ]);

        resolve(response);
    });
};

const prepare_card = (data) => {
    var res = [];

    for (const [key, value] of Object.entries(data)) {
        if (value == "") continue;

        switch (key) {
            case "work":
                res.push(`    Work : ${value}`);
                break;

            case "github":
                res.push(`  GitHub : ${value}`);
                break;

            case "devto":
                res.push(`  Dev.to : ${value}`);
                break;

            case "linkedIn":
                res.push(`LinkedIn : ${value}`);
                break;

            case "twitter":
                res.push(` Twitter : ${value}`);
                break;
        }
    }

    return res.join("\n");
};

export default async () => {
    let response = await get_information();
    let title = `${response.name}'s card`;
    let folder = `${response.name}-card`;

    let card = prepare_card(response);
    let boxed = boxen(card, {
        padding: 2,
        margin: 1,
        title: title,
        titleAlignment: "center",
    });

    mkdir_sync(folder);
    fs.writeFileSync(
        `${folder}/README.md`,
        README.replace(/\[\[NAME\]\]/, response.name)
    );
    fs.writeFileSync(
        `${folder}/package.json`,
        PACKAGE.replace(/\[\[NAME\]\]/, response.name).toLocaleLowerCase()
    );
    fs.writeFileSync(
        `${folder}/index.js`,
        INDEX.replace(/\[\[CARD\]\]/, boxed)
    );

    console.log(boxed);
};
