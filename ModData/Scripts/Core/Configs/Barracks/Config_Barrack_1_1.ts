import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";
import { Config_Barrack_1_1_1 } from "./Config_Barrack_1_1_1";
import { Config_Barrack_1_1_2 } from "./Config_Barrack_1_1_2";

export class Config_Unit_1_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Archer_2";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1500);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 400);
        // увеличиваем количество выпускаемых стрел
        ScriptUtils.SetValue(config.MainArmament, "EmitBulletsCountMin", 4);
        ScriptUtils.SetValue(config.MainArmament, "EmitBulletsCountMax", 4);
    }
}


export class Config_Barrack_1_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Sawmill";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_1_1;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_Barrack_1_1_1, Config_Barrack_1_1_2];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);
        
        // имя
        ScriptUtils.SetValue(config, "Name", "Стрельбище огня");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 200, 0, 0));
    }
}
