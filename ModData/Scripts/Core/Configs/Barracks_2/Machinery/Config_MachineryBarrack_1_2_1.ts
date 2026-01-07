import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { IBarrack } from "../IBarrack";
import { IAttackingUnit } from "../../IAttackingUnit";
import { Config_MachineryWay } from "./Config_MachineryWay";

export class Config_MachineryUnit_1_2_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_MachineryUnit_1_2_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Catapult";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 2000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 200);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
        // параметры атаки
        ScriptUtils.SetValue(config, "Sight", 3);
        ScriptUtils.SetValue(config, "OrderDistance", 10);
        ScriptUtils.SetValue(config.MainArmament, "Range", 10);
        ScriptUtils.SetValue(config.MainArmament, "BaseAccuracy", 1);
    }
}

export class Config_MachineryBarrack_1_2_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_MachineryBarrack_1_2_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Factory";

    public static spawnedUnit        : typeof IAttackingUnit = Config_MachineryUnit_1_2_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Завод металла");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 170, 169, 173));
        // добавляем требование
        config.TechConfig.Requirements.Add(GetCfgUidToCfg(Config_MachineryWay.CfgUid));
        // стоимость обычного улучшаемого здания
        ScriptUtils.SetValue(config.CostResources, "Gold",   200);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 200);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
