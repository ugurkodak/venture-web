import { Terminal } from './terminal';

const _terminal: Terminal = new Terminal();

document.body.appendChild(_terminal.html);
_terminal.setWidth('640px');
_terminal.setHeight('480px');
_terminal.enableLocalScrolling(true);

export async function promptAsync(message: string, callback: (input: string) => Promise<null | string>) {
   
}

export function prompt(message: string, callback: (input: string) => null | string) {
    _terminal.input(message, input => {
        console.log('Prompt Input: ' + input);
        let inputError = callback(input);
        if (inputError != null) {
            printError(inputError as string);
            prompt(message, callback);
        }
    });
}

export function promptActions(actions: string[], callback: (action: string) => null | string) {
    let actionList = '';
    actions.forEach((val, i) => {
        if (i > 0)
            actionList += ' | ';
        actionList += val;
    });
    prompt(actionList, action => {
        console.log(action);
        let selectedAction: string[];
        selectedAction = actions.filter(val => val.toLowerCase() == action.toLowerCase());
        if (selectedAction.length > 1)
            return 'Duplicate actions.';
        else if (selectedAction.length < 1) {
            return 'Type action to proceed';
        }
        else {
             return callback(selectedAction[0]);
        }
    });
}

export function print(message: string) {
    _terminal.print(message);
}

export function printWithMargin(message: string) {
    _terminal.print(' ');
    _terminal.print(message);
}

function printError(message: string) {
    printWithMargin('Error: ' + message);
}