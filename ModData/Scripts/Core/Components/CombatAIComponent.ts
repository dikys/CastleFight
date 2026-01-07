import { IComponent, COMPONENT_TYPE } from "./IComponent";

/** тип баффа */
export enum COMBATAI_TYPE {
    EMPTY,
    FOCUS_MAGES,
    FOCUS_RANGED,

    SIZE
};

/** Компонент с информацией о текущем бафе, его наличие означает, что юнита можно баффать */
export class CombatAIComponent extends IComponent {
    /** тип наложенного баффа на юнита */
    combatType: COMBATAI_TYPE;

    public constructor(combatType?: COMBATAI_TYPE) {
        super(COMPONENT_TYPE.COMBATAI_COMPONENT);
        if (combatType) {
            this.combatType = combatType;
        } else {
            this.combatType = COMBATAI_TYPE.EMPTY;
        }
    }

    public Clone() : CombatAIComponent {
        return new CombatAIComponent(this.combatType);
    }
};