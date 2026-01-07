import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { IBarrack } from "../IBarrack";
import { IAttackingUnit } from "../../IAttackingUnit";
import { Config_MagesBarrack_1_1_1_1 } from "./Config_MagesBarrack_1_1_1_1";
import { Config_MagesBarrack_1_1_1_2 } from "./Config_MagesBarrack_1_1_1_2";
import { Config_MagesWay } from "./Config_MagesWay";

export class Config_MagesUnit_1_1_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_MagesUnit_1_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Mag_2";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 3000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 100);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 1000);
    }
}

export class Config_MagesBarrack_1_1_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_MagesBarrack_1_1_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Labor";

    public static spawnedUnit        : typeof IAttackingUnit = Config_MagesUnit_1_1_1;
    public static improvesToBarracks : Array<typeof IBarrack> = [Config_MagesBarrack_1_1_1_1, Config_MagesBarrack_1_1_1_2];

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Лаборатория огня");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 200, 0, 0));
        // добавляем требование
        config.TechConfig.Requirements.Add(GetCfgUidToCfg(Config_MagesWay.CfgUid));
        // стоимость обычного улучшаемого здания
        ScriptUtils.SetValue(config.CostResources, "Gold",   200);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 200);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
