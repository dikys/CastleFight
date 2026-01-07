import { IAttackingUnit } from "../IAttackingUnit";
import { GetCfgUidToCfg } from "../IConfig";
import { Config_CavalryBarrack_2_2 } from "./Cavalry/Config_CavalryBarrack_2_2";
import { IBarrack } from "./IBarrack";
import { Config_MeleeBarrack_2_1 } from "./Melee/Config_MeleeBarrack_2_1";
import { Config_UndeadBarrack_2_3 } from "./Undead/Config_UndeadBarrack_2_3";

export class Config_Unit_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Swordmen";

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
    }
}

export class Config_Barrack_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Farm";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2;
    public static improvesToBarracks : Array<typeof IBarrack> = [
        Config_CavalryBarrack_2_2,

        Config_MeleeBarrack_2_1,

        Config_UndeadBarrack_2_3
    ];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Казарма ополчения");
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
    }
}
