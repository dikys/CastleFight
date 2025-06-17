import { createHordeColor } from "library/common/primitives";
import { IConfig, GetCfgUidToCfg } from "../IConfig";
import { BUFF_TYPE } from "../../Components/BuffableComponent";
import { BuffComponent } from "../../Components/BuffComponent";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";

export class Config_Holy_spirit_accuracy extends IConfig {
    public static CfgUid      : string = "#CastleFight_Holy_spirit_accuracy";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Raider";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        this.Entity.components.set(COMPONENT_TYPE.BUFF_COMPONENT, new BuffComponent(BUFF_TYPE.ACCURACY));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Святой дух меткости");
        // описание
        ScriptUtils.SetValue(config, "Description", "Тот кого ударит данный дух, получит его силу\n" +
            "Увеличение дальности видимости на 4 (макс 14)\n" +
            "Для дальнего боя:\n" +
            "Увеличение перезарядки в 2 раза\n" +
            "Увеличение дальности атаки в 2 раза\n" +
            "Увеличение скорости снаряда примерно в 3 раза\n"
        );
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1);
        // делаем урон = 0
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 0);
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(150, 148, 0, 211));
        // время постройки
        ScriptUtils.SetValue(config, "ProductionTime", 1500);
    }
}