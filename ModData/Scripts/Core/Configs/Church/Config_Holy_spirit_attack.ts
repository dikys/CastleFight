import { createHordeColor } from "library/common/primitives";
import { IConfig, GetCfgUidToCfg } from "../IConfig";
import { BUFF_TYPE } from "../../Components/BuffableComponent";
import { BuffComponent } from "../../Components/BuffComponent";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";

export class Config_Holy_spirit_attack extends IConfig {
    public static CfgUid      : string = "#CastleFight_Holy_spirit_attack";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Raider";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        this.Entity.components.set(COMPONENT_TYPE.BUFF_COMPONENT, new BuffComponent(BUFF_TYPE.ATTACK));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Святой дух атаки");
        // описание
        // ScriptUtils.SetValue(config, "Description", "Тот кого ударит данный дух, получит его силу\n" +
        //     "Увеличение урона в 5 раз (макс 1 000)\n" +
        //     "Для дальнего боя:\n" +
        //     "Увеличение дальности атаки, видимости на 2 (макс 13)\n" +
        //     "Увеличение снарядов на 2 (макс 5)"
        // );
        ScriptUtils.SetValue(config, "Description", "Тот кого ударит данный дух, получит его силу\n" +
            "Ближники: урон х5\n" +
            "Дальники: урон х5 (макс 1000), число снарядов +2 (макс 5)\n" +
            "Маги и техника: урон x5 (макс 1000)\n"
        );
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 1);
        // делаем урон = 0
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 0);
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(150, 150, 0, 0));
        // время постройки
        ScriptUtils.SetValue(config, "ProductionTime", 1500);
    }
}