// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "google-search" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	vscode.window.showInformationMessage('onStartupFinished');

	vscode.workspace
		.getConfiguration()
		.update(
			'terminal.integrated.copyOnSelection',
			true,
			vscode.ConfigurationTarget.Global
		);

	let disposable = vscode.commands.registerCommand(
		'google-search.makeSearch',
		() => {
			// The code you place here will be executed every time your command is executed

			// Display a message box to the user

			vscode.workspace
				.getConfiguration()
				.update(
					'terminal.integrated.copyOnSelection',
					true,
					vscode.ConfigurationTarget.Global
				);

			const activeTextEditor = vscode.window.activeTextEditor;

			if (activeTextEditor) {
				const selectedText = activeTextEditor.document.getText(
					activeTextEditor.selection
				);

				vscode.window.showInformationMessage(selectedText);

				vscode.env.openExternal(
					vscode.Uri.parse(`https://www.google.com/search?q=${selectedText}`)
				);
			}
		}
	);

	let terminalDisposable = vscode.commands.registerCommand(
		'google-search.makeSearchFromTerminal',
		async () => {
			// The code you place here will be executed every time your command is executed

			// Display a message box to the user
			const selectedText = await vscode.env.clipboard.readText();

			vscode.window.showInformationMessage(selectedText);

			vscode.env.openExternal(
				vscode.Uri.parse(`https://www.google.com/search?q=${selectedText}`)
			);
		}
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(terminalDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
