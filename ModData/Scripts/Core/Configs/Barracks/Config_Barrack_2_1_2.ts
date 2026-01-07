import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";

export class Config_Unit_2_1_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Beamman";
    public static speedCoeff  : number = 1.5;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 2500);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 600);
    }
}

export class Config_Barrack_2_1_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_StoneBarrack";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_1_2;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Академия дубины");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 170, 107, 0));
    }
}
