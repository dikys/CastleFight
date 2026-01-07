import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { IBarrack } from "../IBarrack";
import { IAttackingUnit } from "../../IAttackingUnit";
import { Config_UndeadWay } from "./Config_UndeadWay";

export class Config_UndeadUnit_2_3_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_UndeadUnit_2_3_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Minotaur";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 4000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
    }
}

export class Config_UndeadBarrack_2_3_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_UndeadBarrack_2_3_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_StoneBarrack";

    public static spawnedUnit        : typeof IAttackingUnit = Config_UndeadUnit_2_3_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Кузница нежити");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
        // добавляем требование
        config.TechConfig.Requirements.Add(GetCfgUidToCfg(Config_UndeadWay.CfgUid));
    }
}
