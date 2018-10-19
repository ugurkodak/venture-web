import { Terminal } from './terminal';

export class IO {
    private _terminal: Terminal;
    private _actions: string[];
    
    constructor() {
        this._terminal = new Terminal();
        document.body.appendChild(this._terminal.html);
        this._terminal.setWidth('640px');
        this._terminal.setHeight('480px');
        this._terminal.enableLocalScrolling(true);
        this._actions = ['Login', 'Register', 'About', 'Exit'];
    }

    public welcome(): void {
        this.print(' __      __        _');
        this.print(' \\ \\    / /       | |                 ');
        this.print('  \\ \\  / /__ _ __ | |_ _   _ _ __ ___ ');
        this.print('   \\ \\/ / _ \\ \'_ \\| __| | | | \'__/ _ \\');
        this.print('    \\  /  __/ | | | |_| |_| | | |  __/');
        this.print('     \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|');
        this.print(' ');
        this.print(' ');
        this.prompt('Press return to see start...', input => {
           this.promptActions();
       });
    }

    private prompt(message: string, callback: (input: string) => void) {
        this._terminal.input(message, input => {
            if (input == '')
                this.promptActions();
            else
                callback(input);
        });
    }

    private promptActions() {
        let actionList = '';
        this._actions.forEach((val, i) => {
            if (i > 0)
                actionList += ' | ';
            actionList += val;
        });
        this.printWithMargin(actionList);
        this.prompt('', input => {
            let selectedAction: string[];
            selectedAction = this._actions
                .filter(val => val.toLowerCase() == input.toLowerCase());
            if (selectedAction.length > 1)
                this.printError('Duplicate actions.');
            else if (selectedAction.length < 1) {
                this.promptActions();
            }
            else {
                //TODO: Process action
                this.print('You have selected ' + selectedAction);
            }
        });
    }

    private exit() {
        window.close();
    }

    private print(message: string) {
        this._terminal.print(message);
    }

    private printWithMargin(message: string) {
        this._terminal.print(' ');        
        this._terminal.print(message);
    }

    private printError(message: string) {
        this.printWithMargin('Error: ' + message);
    }

    
}