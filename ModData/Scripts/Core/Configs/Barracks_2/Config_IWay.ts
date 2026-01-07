import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";
import { IConfig, GetCfgUidToCfg } from "../IConfig";

export class Config_IWay extends IConfig {
    public static CfgUid      : string = "#CastleFight_IWay";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Btower";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Башня пути");
        // описание
        ScriptUtils.SetValue(config, "Description", "Здание для выбора дальнейшего пути развития.");
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 60000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 300);
        // делаем урон = 0
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 400);
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
        ScriptUtils.SetValue(config.CostResources, "Metal",  100);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}