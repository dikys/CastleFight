import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";
import { Config_Barrack_2_3_1 } from "./Config_Barrack_2_3_1";

export class Config_Unit_2_3 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_3";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Skeleton";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1500);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
    }
}

export class Config_Barrack_2_3 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_3";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Barrack";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_3;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_Barrack_2_3_1];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Казарма нежити");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
    }
}
