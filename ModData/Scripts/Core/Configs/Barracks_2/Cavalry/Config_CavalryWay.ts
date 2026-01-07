import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { Config_IWay } from "../Config_IWay";

export class Config_CavalryWay extends Config_IWay {
    public static CfgUid      : string = "#CastleFight_CavalryWay";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Башня пути всадников");
        // описание
        ScriptUtils.SetValue(config, "Description", "Открывает технологии всадников");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
