import { GetCfgUidToCfg } from "../IConfig";
import { Config_Barrack_1_1 } from "./Config_Barrack_1_1";
import { Config_Barrack_1_2 } from "./Config_Barrack_1_2";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";

export class Config_Unit_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Archer";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 800);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 400);
    }
}
export class Config_Barrack_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Sawmill";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_1;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_Barrack_1_1, Config_Barrack_1_2];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Стрельбище");
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
    }
}

