import { GetCfgUidToCfg } from "../../IConfig";
import { IBarrack } from "../IBarrack";
import { IAttackingUnit } from "../../IAttackingUnit";
import { Config_CavalryBarrack_2_2_1 } from "./Config_CavalryBarrack_2_2_1";
import { Config_CavalryWay } from "./Config_CavalryWay";

export class Config_CavalryUnit_2_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_CavalryUnit_2_2";
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


export class Config_CavalryBarrack_2_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_CavalryBarrack_2_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Stables";

    public static spawnedUnit        : typeof IAttackingUnit = Config_CavalryUnit_2_2;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_CavalryBarrack_2_2_1];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Конюшня");
        // добавляем требование
        config.TechConfig.Requirements.Add(GetCfgUidToCfg(Config_CavalryWay.CfgUid));
    }
}
