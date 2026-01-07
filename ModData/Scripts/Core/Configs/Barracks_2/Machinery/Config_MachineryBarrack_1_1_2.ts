import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { IBarrack } from "../IBarrack";
import { IAttackingUnit } from "../../IAttackingUnit";
import { Config_MachineryWay } from "./Config_MachineryWay";

export class Config_MachineryUnit_1_1_2 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_MachineryUnit_1_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Balista";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 2000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 200);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 1000);
        // параметры атаки
        ScriptUtils.SetValue(config, "Sight", 3);
        ScriptUtils.SetValue(config, "OrderDistance", 9);
        ScriptUtils.SetValue(config.MainArmament, "Range", 9);
        ScriptUtils.SetValue(config.MainArmament, "BaseAccuracy", 1);
    }
}

export class Config_MachineryBarrack_1_1_2 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_MachineryBarrack_1_1_2";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Factory";

    public static spawnedUnit        : typeof IAttackingUnit = Config_MachineryUnit_1_1_2;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Завод огня");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 200, 0, 0));
        // добавляем требование
        config.TechConfig.Requirements.Add(GetCfgUidToCfg(Config_MachineryWay.CfgUid));
        // стоимость обычного улучшаемого здания
        ScriptUtils.SetValue(config.CostResources, "Gold",   200);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 200);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
