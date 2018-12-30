import Notice from './notice';
import * as prefabs from './prefabs';

let queue: Notice[] = [];
let active: Notice;

export function addToQueue(id: NoticeId) {
    let notice: Notice;
    switch (id) {
        case NoticeId.MAIN_MENU: {
            notice = new Notice(prefabs.mainMenu());
            break;
        }
        default: {
            console.error('Undefined notice id');
            return;
        }
    }
    queue.push(notice);
}

export function open(index?: number) {
    let activeNotice: Notice;
    if (index) activeNotice = queue[index];
    else if (queue[0]) activeNotice = queue[0];
    else return console.error('Notice does not exist');
    activeNotice.addToScene();
    active = activeNotice;
}

export enum NoticeId {
    MAIN_MENU,
}