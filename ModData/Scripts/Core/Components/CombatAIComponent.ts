import { Unit, UnitSpecification, UnitFlags, UnitConfig } from "library/game-logic/horde-types";
import { IComponent, COMPONENT_TYPE } from "./IComponent";

export const UNIT_COMBAT_FLAG_MAGE     = 1 << 0;
export const UNIT_COMBAT_FLAG_MACHINE  = 1 << 1;
export const UNIT_COMBAT_FLAG_RANGED   = 1 << 2;
export const UNIT_COMBAT_FLAG_ARMORED  = 1 << 3;
export const UNIT_COMBAT_FLAG_BUILDING = 1 << 4;
export const UNIT_COMBAT_FLAG_FIRE_IMM = 1 << 5;
export const UNIT_COMBAT_FLAG_MAGE_IMM = 1 << 6;
export const UNIT_COMBAT_FLAG_RIDER    = 1 << 7;
const unitsCombatFlagsCache = new Map<string, number>();
export function GetUnitCombatFlags(unit: Unit): number {
    let unitFlags = unitsCombatFlagsCache.get(unit.Cfg.Uid);
    if (unitFlags === undefined) {
        unitFlags = 0;
        if (unit.Cfg.Specification.HasFlag(UnitSpecification.Mage))    unitFlags |= UNIT_COMBAT_FLAG_MAGE;
        if (unit.Cfg.Specification.HasFlag(UnitSpecification.Machine)) unitFlags |= UNIT_COMBAT_FLAG_MACHINE;
        if (unit.Cfg.MainArmament && unit.Cfg.MainArmament.Range > 1)  unitFlags |= UNIT_COMBAT_FLAG_RANGED;
        if (unit.Cfg.Shield > 0)                                       unitFlags |= UNIT_COMBAT_FLAG_ARMORED;
        if (unit.Cfg.Flags.HasFlag(UnitFlags.Building))                unitFlags |= UNIT_COMBAT_FLAG_BUILDING;
        if (unit.Cfg.Flags.HasFlag(UnitFlags.FireResistant))           unitFlags |= UNIT_COMBAT_FLAG_FIRE_IMM;
        if (unit.Cfg.Flags.HasFlag(UnitFlags.MagicResistant))          unitFlags |= UNIT_COMBAT_FLAG_MAGE_IMM;
        if (unit.Cfg.Specification.HasFlag(UnitSpecification.Rider))   unitFlags |= UNIT_COMBAT_FLAG_RIDER;
        unitsCombatFlagsCache.set(unit.Cfg.Uid, unitFlags);
    }
    return unitFlags;
}

/** Компонент с информацией о текущем бафе, его наличие означает, что юнита можно баффать */
export class CombatAIComponent extends IComponent {
    /** маска агра */
    whiteFlags: number;
    /** маска игнора */
    blackFlags: number;
    /** флаг, что поведение активно */
    isActive: boolean;
    /** радиус поведения */
    radius: number;

    public constructor(whiteFlags?: number, blackFlags?: number, isActive?: boolean, radius?: number) {
        super(COMPONENT_TYPE.COMBATAI_COMPONENT);
        if (whiteFlags) {
            this.whiteFlags = whiteFlags;
        } else {
            this.whiteFlags = 0;
        }
        if (blackFlags) {
            this.blackFlags = blackFlags;
        } else {
            this.blackFlags = 0;
        }
        if (isActive) {
            this.isActive = isActive;
        } else {
            this.isActive = false;
        }
        if (radius) {
            this.radius = radius;
        } else {
            this.radius = 10;
        }
    }

    public Clone() : CombatAIComponent {
        return new CombatAIComponent(this.whiteFlags, this.blackFlags, this.isActive);
    }

    public InitConfig(cfg : UnitConfig) {
        super.InitConfig(cfg);

        var whiteFlagsInfo = "";
        if (this.whiteFlags) {
            whiteFlagsInfo = "\nСтарается атаковать следующих противников: " +
            (this.whiteFlags & UNIT_COMBAT_FLAG_ARMORED ? "бронированных " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_BUILDING ? "строения " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_MAGE ? "магов " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_MACHINE ? "машины " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_RANGED ? "дальнобойных " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_FIRE_IMM ? "огнестойких " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_MAGE_IMM ? "магостойких " : "") +
            (this.whiteFlags & UNIT_COMBAT_FLAG_RIDER ? "всадников " : "");
        }
        var blackFlagsInfo = "";
        if (this.blackFlags) {
            blackFlagsInfo = "\nИгнорирует следующих противников: " +
            (this.blackFlags & UNIT_COMBAT_FLAG_ARMORED ? "бронированных " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_BUILDING ? "строения " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_MAGE ? "магов " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_MACHINE ? "машины " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_RANGED ? "дальнобойных " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_FIRE_IMM ? "огнестойких " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_MAGE_IMM ? "магостойких " : "") +
            (this.blackFlags & UNIT_COMBAT_FLAG_RIDER ? "всадников " : "");
        }

        if (this.whiteFlags || this.blackFlags) {
            // даем описание
            ScriptUtils.SetValue(cfg, "Description", cfg.Description + (cfg.Description == "" ? "" : "\n\n") +
                "Продвинутое поведение" + (this.isActive ? "" : "(не активно)") + ":\n" +
                "В радиусе " + this.radius + "клеток"
                + whiteFlagsInfo
                + blackFlagsInfo
            );
        }
    }
};
