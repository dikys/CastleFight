import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";

export class Config_Unit_2_2_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_2_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Bearmen";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 3000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 700);
    }
}

export class Config_Barrack_2_2_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_2_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Stables";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_2_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Медвежья конюшня");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 60, 105, 31));
    }
}
