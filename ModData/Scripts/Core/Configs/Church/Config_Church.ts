import { UnitProducerProfessionParams, UnitProfession } from "library/game-logic/unit-professions";
import { CfgAddUnitProducer } from "../../Utils";
import { IConfig, GetCfgUidToCfg } from "../IConfig";
import { Config_Holy_spirit_accuracy } from "./Config_Holy_spirit_accuracy";
import { Config_Holy_spirit_attack } from "./Config_Holy_spirit_attack";
import { Config_Holy_spirit_defense } from "./Config_Holy_spirit_defense";
import { Config_Holy_spirit_health } from "./Config_Holy_spirit_health";
import { Config_Holy_spirit_cloning } from "./Config_Holy_spirit_cloning";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";

export class Config_Church extends IConfig {
    public static CfgUid      : string = "#CastleFight_Church";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Church";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Церковь");
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 60000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // описание
        ScriptUtils.SetValue(config, "Description", "Святое место, позволяющее заполучить силу святых духов. Для вызова духа требуется хотя бы 1 свободная клетка вокруг церкви.");
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   500);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 500);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
        {
            // даем профессию найма юнитов
            CfgAddUnitProducer(config);

            // очищаем список тренировки
            var producerParams = config.GetProfessionParams(UnitProducerProfessionParams, UnitProfession.UnitProducer);
            // @ts-expect-error
            var produceList    = producerParams.CanProduceList;
            produceList.Clear();

            // добавляем святые духи
            produceList.Add(GetCfgUidToCfg(Config_Holy_spirit_accuracy.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Holy_spirit_attack.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Holy_spirit_cloning.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Holy_spirit_defense.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Holy_spirit_health.CfgUid));
        }
    }
}