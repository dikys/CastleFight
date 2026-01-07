import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../../IConfig";
import { Config_EmptyWay } from "../Config_EmptyWay";

export class Config_MelleWay extends Config_EmptyWay {
    public static CfgUid      : string = "#CastleFight_MelleWay";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Башня пути пехоты");
        // описание
        ScriptUtils.SetValue(config, "Description", "Открывает технологии пехоты");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}
