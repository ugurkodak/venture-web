import { Terminal } from './terminal';

const _terminal: Terminal = new Terminal();

document.body.appendChild(_terminal.html);
_terminal.setWidth('640px');
_terminal.setHeight('480px');
_terminal.enableLocalScrolling(true);

export async function prompt(message: string | string[], propercase: boolean = false): Promise<string> {
    let input = await new Promise<string>((resolve) => {
        if (Array.isArray(message)) {
            let actionList = '';
            message.forEach((val, i) => {
                if (i > 0)
                    actionList += ' | ';
                actionList += val;
            });
            _terminal.input(actionList, resolve);
        }
        else _terminal.input(message, resolve);
    });
    if (propercase) return input.charAt(0).toUpperCase() + input.toLocaleLowerCase().slice(1);
    else return input;
}

export function print(message: string) {
    _terminal.print(message);
}

export function printWithMargin(message: string) {
    _terminal.print(' ');
    _terminal.print(message);
}

export function printError(message: string) {
    printWithMargin('Error: ' + message);
}

export function printLogo(version?: string) {
    let v = '';
    if (version)
        v = version;
    print(' __      __        _');
    print(' \\ \\    / /       | |                 ');
    print('  \\ \\  / /__ _ __ | |_ _   _ _ __ ___ ');
    print('   \\ \\/ / _ \\ \'_ \\| __| | | | \'__/ _ \\');
    print('    \\  /  __/ | | | |_| |_| | | |  __/');
    print('     \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|' + '  ' + v);
    print(' ');
    print(' ');
}