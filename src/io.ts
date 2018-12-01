import { Terminal } from './terminal';

const _terminal: Terminal = new Terminal();

document.body.appendChild(_terminal.html);
_terminal.setWidth('640px');
_terminal.setHeight('480px');
_terminal.enableLocalScrolling(true);


// export interface IPrompt {
//     message: string | string[],
//     validate?(input: string): boolean,
//     tip?: string,
//     polar?: boolean,
//     propercase?: boolean
// }

/** Prompts user
 * @param message Message or list of of options to show before user input
 * @param polar (optional) Yes-no question?
 * @param proper (optional) Format input to propercase? (e.g input -> Input)
 * @param validate (optional) Function used for input validation. Should return error or null
*/
export async function newprompt(
    message: string | string[],
    polar?: boolean,
    propercase?: boolean,
    validate?: (input: string) => string | null): Promise<string> {
        let multiChoice = Array.isArray(message); 
        let input = await new Promise<string>((resolve) => {
            if (multiChoice) {
                let actionList = '';
                (message as string[]).forEach((val, i) => {
                    if (i > 0) actionList += ' | ';
                    actionList += val;
                });
                _terminal.input(actionList, resolve);
            }
            else _terminal.input(message as string, resolve);
        });
        if (multiChoice) {
            let validOption = false;
            input = toPropperCase(input);
            (message as string[]).forEach(option => {
                if (input == option) validOption = true;
            });
            if (!validOption) {
                printWithMargin('Please choose from options provided.');
                await newprompt(message, polar, propercase, validate);
            }
        }
        else if (polar) {
            input = toPropperCase(input);            
            if (input == 'Y' || input == 'Yes' || input == 'N' || input == 'No') {
                printWithMargin('Please answer yes(y) or no(n).');
                await newprompt(message, polar, propercase, validate);
            }
        }
        else if (propercase) input = toPropperCase(input);
        if (validate != null) {
            let validationError = validate(input);
            if (validationError != null) printWithMargin(validationError);
            await newprompt(message, polar, propercase, validate);
        }
        return input;
}

export async function prompt(message: string | string[], propercase: boolean = false): Promise<string> {
    let input = await new Promise<string>((resolve) => {
        if (Array.isArray(message)) {
            let actionList = '';
            message.forEach((val, i) => {
                if (i > 0) actionList += ' | ';
                actionList += val;
            });
            _terminal.input(actionList, resolve);
        }
        else _terminal.input(message, resolve);
    });
    if (propercase) return toPropperCase(input);
    else return input;
}

export function toPropperCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1);
}

export function printRealtime(message: string) {
    _terminal.clear();
    _terminal.print(message);
}

export function print(message: string) {
    _terminal.print(message);
}

export function printWithMargin(message: string) {
    _terminal.print(' ');
    _terminal.print(message);
    _terminal.print(' ');
}

export function printError(message: string) {
    printWithMargin('Error: ' + message);
}

export function printLogo(version?: string) {
    let v = '';
    if (version) v = version;
    print(' __      __        _');
    print(' \\ \\    / /       | |                 ');
    print('  \\ \\  / /__ _ __ | |_ _   _ _ __ ___ ');
    print('   \\ \\/ / _ \\ \'_ \\| __| | | | \'__/ _ \\');
    print('    \\  /  __/ | | | |_| |_| | | |  __/');
    print('     \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|' + '  ' + v);
    print(' ');
    print(' ');
}