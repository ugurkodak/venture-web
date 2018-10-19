const PROMPT_INPUT = 1, PROMPT_PASSWORD = 2, PROMPT_CONFIRM = 3

export class Terminal {
    public html: HTMLDivElement;
    private _output: HTMLParagraphElement;
    private _innerWindow: HTMLDivElement;
    private _inputLine: HTMLSpanElement;
    private _cursor: HTMLSpanElement;
    private _input: HTMLParagraphElement;
    private _shouldBlinkCursor: boolean;
    private _firstPrompt: boolean;

    constructor(id?: string) {
        this.html = document.createElement('div');
        this.html.className = 'Terminal';
        if (typeof (id) === 'string') {
            this.html.id = id;
        }

        this._innerWindow = document.createElement('div');
        this._output = document.createElement('p');
        this._inputLine = document.createElement('span');
        this._cursor = document.createElement('span');
        this._input = document.createElement('p');

        this._shouldBlinkCursor = true;
        this._firstPrompt = true;

        this.html.style.fontFamily = 'Monaco, Courier';
        this.html.style.margin = '0';
        this._innerWindow.style.padding = '10px';
        this._input.style.display = 'block';
        this._input.style.margin = '0';
        this._output.style.margin = '0';
        this._cursor.style.background = 'white';
        this._cursor.innerHTML = 'C'; //put something in the cursor..
        this._cursor.style.display = 'none'; //then hide it
        this._input.style.display = 'none';

        this._input.appendChild(this._inputLine);
        this._input.appendChild(this._cursor);
        this._innerWindow.appendChild(this._output);
        this._innerWindow.appendChild(this._input);
        this.html.appendChild(this._innerWindow);

        this.setBackgroundColor('black');
        this.setTextColor('white');
        this.setTextSize('1em');
        this.setWidth('100%');
        this.setHeight('100%');
    }

    public print(message: string): void {
        let newLine = document.createElement('div');
        newLine.style.whiteSpace = 'pre-wrap';
        newLine.textContent = message;
        this._output.appendChild(newLine);
    }

    public input(message: string, callback: (input: string) => void): void {
        this.promptInput(message, PROMPT_INPUT, callback);
    }

    public password(message, callback: (input: string) => void): void {
        this.promptInput(message, PROMPT_PASSWORD, callback);
    }

    public confirm(message, callback: (input: string) => void): void {
        this.promptInput(message, PROMPT_CONFIRM, callback);
    }

    public clear(): void {
        this._output.innerHTML = '';
    }

    public sleep(milliseconds: number, callback: (input: string) => void): void {
        setTimeout(callback, milliseconds);
    }

    public setTextSize(size: string): void {
        this._output.style.fontSize = size;
        this._input.style.fontSize = size;
    }

    public setTextColor(col: string): void {
        this.html.style.color = col;
        this._cursor.style.background = col;
    }

    public setBackgroundColor(col: string): void {
        this.html.style.background = col;
    }

    public setWidth(width: string): void {
        this.html.style.width = width;
    }

    public setHeight(height: string): void {
        this.html.style.height = height;
    }

    public enableLocalScrolling(bool: boolean) {
        if (bool) {
            this.setWidth(this.html.offsetWidth.toString() + 'px');
            this.setHeight(this.html.offsetHeight.toString() + 'px');
            this.html.style.position = 'relative';
            this.html.style.overflow = 'scroll';
        }
        else {
            this.setWidth('100%');
            this.setHeight('100%');
            this.html.style.position = 'static';
            this.html.style.overflow = 'initial';
        }
    }

    public blinkingCursor(bool: boolean): void {
        this._shouldBlinkCursor = bool;
    }

    private fireCursorInterval(inputField: HTMLInputElement): void {
        setTimeout(() => {
            if (inputField.parentElement && this._shouldBlinkCursor) {
                this._cursor.style.visibility = this._cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
                this.fireCursorInterval(inputField);
            } else {
                this._cursor.style.visibility = 'visible';
            }
        }, 500);
    }

    private promptInput(message: string, PROMPT_TYPE: number, callback: (input: string) => void): void {
        let shouldDisplayInput = PROMPT_TYPE === PROMPT_INPUT;
        let inputField = document.createElement('input');

        inputField.style.position = 'absolute';
        inputField.style.zIndex = '-100';
        inputField.style.outline = 'none';
        inputField.style.border = 'none';
        inputField.style.opacity = '0';
        inputField.style.fontSize = '0.2em';

        this._inputLine.textContent = '';
        this._input.style.display = 'block';
        this.html.appendChild(inputField);
        this.fireCursorInterval(inputField);

        if (message.length) {
            this.print(PROMPT_TYPE === PROMPT_CONFIRM ? message + ' (y/n)' : message);
        }

        inputField.onblur = () => {
            this._cursor.style.display = 'none';
        };

        inputField.onfocus = () => {
            inputField.value = this._inputLine.textContent;
            this._cursor.style.display = 'inline';
        }

        this.html.onclick = () => {
            inputField.focus();
        }

        inputField.onkeydown = (e) => {
            if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 || e.which === 9) {
                e.preventDefault();
            } else if (shouldDisplayInput && e.which !== 13) {
                setTimeout(() => {
                    this._inputLine.textContent = inputField.value;
                }, 1);
            }
        }

        inputField.onkeyup = (e) => {
            if (PROMPT_TYPE === PROMPT_CONFIRM || e.which === 13) {
                this._input.style.display = 'none';
                let inputValue = inputField.value;
                if (shouldDisplayInput) {
                    this.print(inputValue);
                }
                this.html.removeChild(inputField);
                if (typeof (callback) === 'function') {
                    if (PROMPT_TYPE === PROMPT_CONFIRM) {
                        callback(<string><any>(inputValue.toUpperCase()[0] === 'Y' ? true : false));
                    } else {
                        callback(inputValue);
                    }
                }
            }
        }

        if (this._firstPrompt) {
            this._firstPrompt = false;
            setTimeout(() => {
                inputField.focus();
            }, 50);
        } else {
            inputField.focus();
        }
    }
}