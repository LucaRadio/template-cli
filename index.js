#!/usr/bin/env node

/**
 * template-cli
 * Easier and faster way to start coding
 *
 * @author Luca <none>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { copyFile, mkdir } = require('fs');
const path = require('path');
const ask = require("prompt-sync")({ sigint: true });

let dirName;
let fileName;

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const absolutePath = path.resolve("../../");




/**
 * This function copy file from folder template and create a new file with the option selected during the code executing
 * @param {string} fileNameToCopy template nameFile
 * @param {string} fileName how file will call at the end of the executing
 * DISCLAIMER: this template use static name on purpose
 * @param {string} extenction extension of the file created
 */

const createFile = function (fileNameToCopy, fileName, extenction) {
	copyFile(`./script/template/${fileNameToCopy}.${extenction}`, `${absolutePath}/${dirName}/${fileName}.${extenction}`, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Successfull Copied File ${extenction}`);
		}
	});
};


/**
 * This function ask if you wanna add a css file. It creates a folder and add a css stylesheet with base code
 * @param {*} dirName Directory Name
 */

const cssOption = function (dirName) {
	const css = ask("Do you want to add CSS file (y/n)");
	if (css === "y") {
		mkdir(`C:/Users/luca1/Desktop/${dirName}/css`, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Successfull Create Directory");
			}
		});
		createFile("style", "css/style", "css");
	}
};



(async () => {

	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	dirName = ask("Hi! Welcome to my first program ever...Please tell me, how do i call your folder? ");
	if (dirName.length < 1) {
		console.log("Please Enter a least 1 letter to create a folder");
		return;
	} else {
		mkdir(`C:/Users/luca1/Desktop/${dirName}`, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Successfull Create Directory");
			}
		});
	}


	if (input.includes("php")) {
		const quest = ask("Do you want to add VUE ? (y/n)");
		if (quest === "y") {
			createFile("indexVue", "index", "php");
			createFile("vue", "main", "js");
		} else {
			createFile("index", "index", "php");
		}

	}

	if (input.includes("html")) {
		const quest = ask("Do you want to add VUE ? (y/n)");
		if (quest === "y") {
			createFile("indexVue", "index", "html");
			createFile("vue", "main", "js");
			cssOption(dirName);
		} else {
			createFile("index", fileName, "html");
			cssOption(dirName);
		}

	}



})();
