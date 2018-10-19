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
        this.welcome();
    }

    public welcome(): void {
        this._terminal.print(' __      __        _');
        this._terminal.print(' \\ \\    / /       | |                 ');
        this._terminal.print('  \\ \\  / /__ _ __ | |_ _   _ _ __ ___ ');
        this._terminal.print('   \\ \\/ / _ \\ \'_ \\| __| | | | \'__/ _ \\');
        this._terminal.print('    \\  /  __/ | | | |_| |_| | | |  __/');
        this._terminal.print('     \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|');
        this._terminal.print(' ');
        this._terminal.print(' ');
        this._terminal.input('Press return to see actions...', input => {
           this._terminal.print('OPTIONS');
       });
    }
}