import { engine } from '../index'

export default class Notice {
    components: ex.UIActor[];

    constructor(components: ex.UIActor[]) {
        this.components = components;
    }

    public addToScene() {
        this.components.forEach(c => {
            engine.add(c);
        });
    }
}