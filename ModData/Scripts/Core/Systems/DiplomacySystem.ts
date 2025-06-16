import { DiplomacyStatus } from "library/game-logic/horde-types";
import { World, GameState } from "../World";

export function DiplomacySystem(world: World, gameTickNum: number) {
    // проверяем, что игра закончилась

    var isGameEnd = true;
    for (var settlementId = 0; settlementId < world.scena.settlementsCount; settlementId++) {
        var settlement = world.settlements[settlementId];
        if (!settlement) {
            continue;
        }
        if (!settlement.Existence.IsTotalDefeat && !settlement.Existence.IsVictory) {
            isGameEnd = false;
            break;
        }
    }
    if (isGameEnd) {
        world.state = GameState.CLEAR;
        return;
    }

    // при уничтожении замка объявляем альянс всем врагам для видимости

    for (var settlementId = 0; settlementId < world.scena.settlementsCount; settlementId++) {
        var settlement = world.settlements[settlementId];
        if (!settlement ||
            settlement.Existence.IsTotalDefeat ||
            settlement.Existence.IsVictory ||
            !world.settlements_castleUnit[settlementId].IsDead) {
            continue;
        }

        // объявляем альянс всем врагам для видимости
        for (var enemySettlementId = 0; enemySettlementId < world.scena.settlementsCount; enemySettlementId++) {
            var enemySettlement = world.settlements[enemySettlementId];
            if (!enemySettlement || 
                !world.settlements_settlements_warFlag[settlementId][enemySettlementId]) {
                continue;
            }
            if (settlement.Diplomacy.GetDiplomacyStatus(enemySettlement) != DiplomacyStatus.Alliance) {
                settlement.Diplomacy.DeclareAlliance(enemySettlement);
                enemySettlement.Diplomacy.DeclareAlliance(settlement);
            }
        }
    }

    // присуждаем поражение альянсам

    for (var settlementId = 0; settlementId < world.scena.settlementsCount; settlementId++) {
        var settlement = world.settlements[settlementId];
        if (!settlement ||
            settlement.Existence.IsTotalDefeat ||
            settlement.Existence.IsVictory) {
            continue;
        }

        // проверяем, что у всего альянса замки уничтожены

        var isDefeat = true;
        for (var allySettlementId = 0; allySettlementId < world.scena.settlementsCount; allySettlementId++) {
            // проверка, что есть мир и замок стоит
            if (!world.settlements[allySettlementId] ||
                world.settlements_settlements_warFlag[settlementId][allySettlementId] ||
                world.settlements_castleUnit[allySettlementId].IsDead) {
                continue;
            }

            // нашелся союзник с целым замком
            isDefeat = false;
            break;
        }
        if (!isDefeat) {
            continue;
        }

        // присуждаем поражение всему альянсу
        for (var allySettlementId = 0; allySettlementId < world.scena.settlementsCount; allySettlementId++) {
            var allySettlement = world.settlements[allySettlementId];
            // проверка, что поселение в игре и есть мир
            if (!allySettlement ||
                world.settlements_settlements_warFlag[settlementId][allySettlementId]) {
                continue;
            }

            // присуждаем поражение
            allySettlement.Existence.ForceTotalDefeat();
        }
    }

    // присуждаем победу последнему альянсу

    for (var settlementId = 0; settlementId < world.scena.settlementsCount; settlementId++) {
        var settlement = world.settlements[settlementId];
        if (!settlement ||
            settlement.Existence.IsTotalDefeat ||
            settlement.Existence.IsVictory) {
            continue;
        }

        // проверяем, что у всех врагов поражение

        var isVictory = true;
        for (var enemySettlementId = 0; enemySettlementId < world.scena.settlementsCount; enemySettlementId++) {
            var enemySettlement = world.settlements[enemySettlementId];
            // проверка, что поселение в игре, есть война, поселение проиграло
            if (!enemySettlement ||
                !world.settlements_settlements_warFlag[settlementId][enemySettlementId] ||
                enemySettlement.Existence.IsTotalDefeat
            ) {
                continue;
            }

            isVictory = false;
        }
        if (!isVictory) {
            continue;
        }

        // присуждаем победу всему альянсу

        for (var allySettlementId = 0; allySettlementId < world.scena.settlementsCount; allySettlementId++) {
            var allySettlement = world.settlements[allySettlementId];
            
            // проверка, что поселение в игре и есть мир
            if (!allySettlement ||
                world.settlements_settlements_warFlag[settlementId][allySettlementId]) {
                continue;
            }

            // присуждаем победу
            if (!allySettlement.Existence.IsVictory) {
                allySettlement.Existence.ForceVictory();
            }
        }

        break;
    }
}