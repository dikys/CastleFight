import { World } from "../World";
import { COMPONENT_TYPE } from "../Components/IComponent";
import { UnitComponent } from "../Components/UnitComponent";
import { Entity } from "../Entity";
import { CombatAIComponent, GetUnitCombatFlags } from "../Components/CombatAIComponent";
import { Unit, UnitCommand } from "library/game-logic/horde-types";
import { iterateOverUnitsInBox } from "library/game-logic/unit-and-map";
import { UnitGiveOrderToCell } from "../Utils";
import { AssignOrderMode } from "library/mastermind/virtual-input";

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

                // проверяем, что есть фокус и активно
                if (combatTypeComponent.whiteFlags == 0 || !combatTypeComponent.isActive) {
                    continue;
                }
                // проверяем, что юнит жив
                if (!unitComponent.unit || unitComponent.unit.IsDead) {
                    continue;
                }
                var unit = unitComponent.unit as Unit;
                
                // теперь атакуем врага согласно фокусу
                // @ts-expect-error
                if (!unit.OrdersMind.ActiveOrder.Target
                    // @ts-expect-error
                    || !(GetUnitCombatFlags(unit.OrdersMind.ActiveOrder.Target) & combatTypeComponent.whiteFlags)
                    // @ts-expect-error
                    || (GetUnitCombatFlags(unit.OrdersMind.ActiveOrder.Target) & combatTypeComponent.blackFlags)) {
                    let unitsIter = iterateOverUnitsInBox(unit.Cell, combatTypeComponent.radius);
                    for (let u = unitsIter.next(); !u.done; u = unitsIter.next()) {
                        var unitCombatFlags = GetUnitCombatFlags(u.value);
                        if (unitCombatFlags & combatTypeComponent.whiteFlags
                            && !(unitCombatFlags & combatTypeComponent.blackFlags)
                            && world.settlements_settlements_warFlag[settlementId][Number.parseInt(u.value.Owner.Uid)]
                        ) {
                            UnitGiveOrderToCell(unit, u.value.Cell, UnitCommand.Attack, AssignOrderMode.Replace);
                            break;
                        }
                    }
                }
            }
        }
    }
}
