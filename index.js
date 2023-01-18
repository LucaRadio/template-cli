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
const { copyFile, mkdir, rmdir } = require('fs');
const path = require('path');
const ask = require("prompt-sync")({ sigint: true });
const fs = require('fs');

let dirName;


const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const absolutePath = path.resolve("../");




/**
 * This function copy file from folder template and create a new file with the option selected during the code executing
 * @param {string} fileNameToCopy template nameFile
 * @param {string} fileName how file will call at the end of the executing
 * DISCLAIMER: this template use static name on purpose
 * @param {string} extenction extension of the file created
 */

function createFile(fileNameToCopy, fileName, extenction) {
	copyFile(`./script/template/${fileNameToCopy}.${extenction}`, `${absolutePath}/${dirName}/${fileName}.${extenction}`, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Successfull Copied File ${extenction}`);
		}
	});
};
function phpFile() {
	console.log("PHP");
	const quest = ask("Do you want to add VUE ? (y/n)");
	if (quest === "y") {
		createFile("indexVue", "index", "php");
		createFile("vue", "main", "js");
	} else if (quest === "n") {
		createFile("index", "index", "php");
	} else {
		rmdir(`${absolutePath}/${dirName}`, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Successfull removed Directory");
			}
		})
		console.log("Something went wrong.\nRetry!");

	};
}
function htmlFile() {
	console.log("HTML");
	const quest = ask("Do you want to add VUE ? (y/n)");
	if (quest === "y") {
		createFile("indexVue", "index", "html");
		createFile("vue", "main", "js")
	} else if (quest === "n") {
		createFile("index", "index", "html");
	} else {
		console.log("Something went wrong.\nRetry!");
	};

}
function cssFile() {
	mkdir(`${absolutePath}/${dirName}/css`, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Successfull Create Directory");
		}
	});
	createFile("style", "css/style", "css");

};
function jsFile() {
	mkdir(`${absolutePath}/${dirName}/js`, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Successfull Create Directory");
		}
	});
	createFile("main", "js/main", "js");

};



(async () => {

	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	if (input.includes("remove")) {
		fileToRemove = ask("What Directory do you want to remove? (Insert right name) ");
		fs.rmdir(`${absolutePath}/${fileToRemove}`, { recursive: true }, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Successfull Remove Directory");
			}
		});
		return;
	} else {

		dirName = ask("Hi! Welcome to my first program ever...Please tell me, how do i call your folder? ");
	}



	if (dirName.length < 1) {
		console.log("Please Enter a least 1 letter to create a folder");
		return;
	} else {
		mkdir(`${absolutePath}/${dirName}`, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Successfull Create Directory");
			}
		});
		let stringLanguage = ask("What file do you wanna create ? (html/php/js/css) ");
		stringLanguage = stringLanguage.split(" ");
		stringLanguage.forEach(element => {
			console.log(element);
			if (element === "html" || element === "HTML") {
				htmlFile()
			} else if (element === "php" || element === "PHP") {
				phpFile();
			} else if (element === "css" || element === "CSS") {
				cssFile();
			} else if (element === "js" || element === "JS" || element === "javascript") {
				jsFile();
			}
		});
	}




})();
