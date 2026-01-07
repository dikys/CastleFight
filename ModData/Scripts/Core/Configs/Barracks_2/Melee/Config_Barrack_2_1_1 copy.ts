import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";

export class Config_Unit_2_1_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_FireforgedWarrior";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 3000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 300);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 350);
    }
}

export class Config_Barrack_2_1_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_StoneBarrack";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_1_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Академия меча");
    }
}
