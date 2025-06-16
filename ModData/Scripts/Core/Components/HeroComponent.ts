import { IComponent, COMPONENT_TYPE } from "./IComponent";

/** компонент героя */
export class HeroComponent extends IComponent {
    /** количество убийств */
    kills: number;
    /** текущий уровень */
    level: number;

    public constructor () {
        super(COMPONENT_TYPE.HERO_COMPONENT);
        this.kills = 0;
        this.level = 0;
    }

    public Clone() : HeroComponent {
        return new HeroComponent();
    }
};