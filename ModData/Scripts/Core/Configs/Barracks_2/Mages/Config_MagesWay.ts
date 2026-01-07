import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { Config_IWay } from "../Config_IWay";

export class Config_MagesWay extends Config_IWay {
    public static CfgUid      : string = "#CastleFight_MagesWay";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Башня пути магов");
        // описание
        ScriptUtils.SetValue(config, "Description", "Открывает технологии магов");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
