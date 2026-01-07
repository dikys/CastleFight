import { GetCfgUidToCfg } from "../IConfig";
import { Config_Barrack_2_2_1 } from "./Config_Barrack_2_2_1";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";

export class Config_Unit_2_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Raider";

    constructor() { super(); }
    
    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 2000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
    }
}


export class Config_Barrack_2_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Stables";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_2;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_Barrack_2_2_1];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Конюшня");
    }
}
