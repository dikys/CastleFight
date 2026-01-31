import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";
import { CombatAIComponent, UNIT_COMBAT_FLAG_ARMORED, UNIT_COMBAT_FLAG_BUILDING, UNIT_COMBAT_FLAG_FIRE_IMM, UNIT_COMBAT_FLAG_MACHINE, UNIT_COMBAT_FLAG_MAGE_IMM } from "../../Components/CombatAIComponent";
import { COMPONENT_TYPE } from "../../Components/IComponent";

export class Config_Unit_1_1_1_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_1_1_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Mag_16";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
        // параметры атаки
        ScriptUtils.SetValue(config, "Sight", 3);
        ScriptUtils.SetValue(config, "OrderDistance", 10);
        ScriptUtils.SetValue(config.MainArmament, "Range", 10);
    }
    
    public static InitEntity() {
        super.InitEntity();
        this.Entity.components.set(COMPONENT_TYPE.COMBATAI_COMPONENT,new CombatAIComponent(
            UNIT_COMBAT_FLAG_BUILDING | UNIT_COMBAT_FLAG_MACHINE | UNIT_COMBAT_FLAG_ARMORED,
            UNIT_COMBAT_FLAG_FIRE_IMM | UNIT_COMBAT_FLAG_MAGE_IMM,
            false));
    }
}

export class Config_Barrack_1_1_1_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_1_1_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_MageHouse";

    public static spawnedUnit : typeof IAttackingUnit = Config_Unit_1_1_1_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Приют мага огня");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 200, 0, 0));
    }
}
