import { Unit } from "library/game-logic/horde-types";
import { IComponent, COMPONENT_TYPE } from "./IComponent";

export class UnitProducedEvent extends IComponent {
    /** ссылка на юнита-строителя */
    producerUnit: Unit;
    /** ссылка на построенного юнита */
    producedUnit: Unit;

    public constructor(producerUnit: Unit, producedUnit: Unit) {
        super(COMPONENT_TYPE.UNIT_PRODUCED_EVENT);

        this.producerUnit = producerUnit;
        this.producedUnit = producedUnit;
    }

    public Clone() : UnitProducedEvent {
        return new UnitProducedEvent(this.producerUnit, this.producedUnit);
    }
};