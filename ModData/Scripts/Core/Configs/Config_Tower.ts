import { BUFF_TYPE, BuffableComponent } from "../Components/BuffableComponent";
import { COMPONENT_TYPE } from "../Components/IComponent";
import { UnitComponent } from "../Components/UnitComponent";
import { GetCfgUidToCfg, IConfig } from "./IConfig";

export class Config_Tower extends IConfig {
    public static CfgUid      : string = "#CastleFight_Tower";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Tower";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        var buffMask = new Array<boolean>(BUFF_TYPE.SIZE);
        for (var i = 0; i < BUFF_TYPE.SIZE; i++) {
            buffMask[i] = true;
        }
        buffMask[BUFF_TYPE.CLONING] = false;
        this.Entity.components.set(COMPONENT_TYPE.BUFFABLE_COMPONENT, new BuffableComponent(buffMask));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Башня");
        // описание
        ScriptUtils.SetValue(config, "Description", "Защитное строение. Не допускайте катапульты. Можно усилить духами (кроме духа клонирования).");
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 60000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 300);
        // делаем урон = 0
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 600);
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   200);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 200);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
    }
}