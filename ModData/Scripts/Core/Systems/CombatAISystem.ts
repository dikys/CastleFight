import { World } from "../World";
import { COMPONENT_TYPE } from "../Components/IComponent";
import { UnitComponent } from "../Components/UnitComponent";
import { Entity } from "../Entity";
import { COMBATAI_TYPE, CombatAIComponent } from "../Components/CombatAIComponent";
import { Unit, UnitCommand, UnitSpecification } from "library/game-logic/horde-types";
import { iterateOverUnitsInBox } from "library/game-logic/unit-and-map";
import { UnitGiveOrderToCell } from "../Utils";
import { AssignOrderMode } from "library/mastermind/virtual-input";

function IsMage (unit: Unit) : boolean {
    return unit.Cfg.Specification.HasFlag(UnitSpecification.Mage);
}

function IsRanged (unit: Unit) : boolean {
    return unit.Cfg.MainArmament && unit.Cfg.MainArmament.Range > 1;
}


export function CombatAISystem(world: World, gameTickNum: number) {
    for (var settlementId = 0; settlementId < world.scena.settlementsCount; settlementId++) {
        var settlement = world.settlements[settlementId];
        if (!settlement || !world.IsSettlementInGame(settlementId)) {
            continue;
        }

        for (var i = 0; i < world.settlements_entities[settlementId].length; i++) {
            var entity = world.settlements_entities[settlementId][i] as Entity;
            if (entity.components.has(COMPONENT_TYPE.COMBATAI_COMPONENT) && entity.components.has(COMPONENT_TYPE.UNIT_COMPONENT)) {
                var unitComponent = entity.components.get(COMPONENT_TYPE.UNIT_COMPONENT) as UnitComponent;
                var combatTypeComponent = entity.components.get(COMPONENT_TYPE.COMBATAI_COMPONENT) as CombatAIComponent;

                // проверяем, что юнит умер
                if (!unitComponent.unit || unitComponent.unit.IsDead) {
                    continue;
                }
                var unit = unitComponent.unit as Unit;

                switch (combatTypeComponent.combatType) {
                    // фокусируем магов в 10 клетках
                    case COMBATAI_TYPE.FOCUS_MAGES:
                        // @ts-expect-error
                        if (!unit.OrdersMind.ActiveOrder.Target || IsMage(unit.OrdersMind.ActiveOrder.Target)) {
                            let unitsIter = iterateOverUnitsInBox(unit.Cell, 10);
                            for (let u = unitsIter.next(); !u.done; u = unitsIter.next()) {
                                if (IsMage(u.value)
                                    && world.settlements_settlements_warFlag[settlementId][Number.parseInt(u.value.Owner.Uid)]) {
                                    UnitGiveOrderToCell(unit, u.value.Cell, UnitCommand.Attack, AssignOrderMode.Replace);
                                    break;
                                }
                            }
                        }
                        break;
                    // фокусируем дальников в 10 клетках
                    case COMBATAI_TYPE.FOCUS_RANGED:
                        // @ts-expect-error
                        if (!unit.OrdersMind.ActiveOrder.Target || IsRanged(unit.OrdersMind.ActiveOrder.Target)) {
                            let unitsIter = iterateOverUnitsInBox(unit.Cell, 10);
                            for (let u = unitsIter.next(); !u.done; u = unitsIter.next()) {
                                if (IsRanged(u.value)
                                    && world.settlements_settlements_warFlag[settlementId][Number.parseInt(u.value.Owner.Uid)]) {
                                    UnitGiveOrderToCell(unit, u.value.Cell, UnitCommand.Attack, AssignOrderMode.Replace);
                                    break;
                                }
                            }
                        }
                        break;
                }
            }
        }
    }
}
