import { Unit } from "library/game-logic/horde-types";
import { COMPONENT_TYPE, IComponent } from "./IComponent";

export class UnitComponent extends IComponent {
    /** ссылка на юнита */
    unit: Unit | null;
    /** ссылка на конфиг */
    cfgUid: string;

    public constructor(unit:Unit | null, cfgUid: string) {
        super(COMPONENT_TYPE.UNIT_COMPONENT);
        this.unit   = unit;
        this.cfgUid = cfgUid;
    }

    public Clone(): UnitComponent {
        return new UnitComponent(this.unit, this.cfgUid);
    }
};