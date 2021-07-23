// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const URL = 'https://www.google.com/search?q=';

export function activate(context: vscode.ExtensionContext) {
	// update vscode configuration to copy the selected text from terminal
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
			const activeTextEditor = vscode.window.activeTextEditor;

			if (activeTextEditor) {
				const selectedText = activeTextEditor.document.getText(
					activeTextEditor.selection
				);

				vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
			}
		}
	);

	let terminalDisposable = vscode.commands.registerCommand(
		'google-search.makeSearchFromTerminal',
		async () => {
			const selectedText = await vscode.env.clipboard.readText();

			vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
		}
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(terminalDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
