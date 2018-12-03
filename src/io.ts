import { Terminal } from './terminal';

const _terminal: Terminal = new Terminal();

document.body.appendChild(_terminal.html);
_terminal.setWidth('640px');
_terminal.setHeight('480px');
_terminal.enableLocalScrolling(true);

/** Prompts user
 * @param validate (optional) Function used for input validation. Should return error or null
*/
export async function prompt(message: string, validate?: (input: string) => string | null): Promise<string> {
    let input = await new Promise<string>((resolve) => {
        _terminal.input(message, resolve);
    });
    if (validate != (undefined || null)) {
        let error = validate(input);
        if (error != (undefined || null)) {
            printWithMargin(error);
            return await prompt(message, validate);
        }
        else return input;
    }
    else return input;
}

/** Prompts a yes-no question. */
export async function promptPolar(question: string): Promise<boolean> {
    let input = toProperCase(await new Promise<string>((resolve) => {
        _terminal.input(question as string, resolve);
    }));
    if (input == 'Y' || input == 'Yes') {
        return true;
    }
    else if (input == 'N' || input == 'No') {
        return false;
    }
    else {
        printWithMargin('Please answer yes(y) or no(n).');
        return await promptPolar(question);
    }
}

/** Prompts a list of predefined options. */
export async function promptOptions(options: string[], message?: string): Promise<string> {
    let input = toProperCase(await new Promise<string>((resolve) => {
        let optionList = '';
        options.forEach((val, i) => {
            if (i > 0) optionList += ' | ';
            optionList += val;
        });
        if (message != (undefined || null)) print(message);
        _terminal.input(optionList, resolve);
    }));
    let validOption = false;
    options.forEach(option => {
        if (input == option) validOption = true;
    });
    if (!validOption) {
        printWithMargin('Please choose from provided options.');
        return await promptOptions(options);
    }
    else return input;

}

export function toProperCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1);
}

export function printRealtime(message: string) {
    _terminal.clear();
    _terminal.print(message);
}

export function print(message: string) {
    _terminal.print(message);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

export function clear() {
    _terminal.clear();
}

export function printWithMargin(message: string) {
    _terminal.print(' ');
    _terminal.print(message);
    _terminal.print(' ');
}

export function printError(error: Error) {
    printWithMargin('Error: ' + error.message);
    console.error(error);
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