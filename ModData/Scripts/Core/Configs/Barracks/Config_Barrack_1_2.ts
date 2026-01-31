import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";
import { Config_Barrack_1_2_1 } from "./Config_Barrack_1_2_1";
import { CombatAIComponent, UNIT_COMBAT_FLAG_ARMORED } from "../../Components/CombatAIComponent";
import { COMPONENT_TYPE } from "../../Components/IComponent";

export class Config_Unit_1_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Crossbowman";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 100);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 800);
    }
    
    public static InitEntity() {
        super.InitEntity();
        this.Entity.components.set(COMPONENT_TYPE.COMBATAI_COMPONENT,new CombatAIComponent(
            UNIT_COMBAT_FLAG_ARMORED,
            0,
            false));
    }
}

export class Config_Barrack_1_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Sawmill";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_1_2;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_Barrack_1_2_1];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Стрельбище металла");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 170, 169, 173));
    }
}
