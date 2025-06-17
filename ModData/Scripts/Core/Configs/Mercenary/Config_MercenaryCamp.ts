import { UnitProducerProfessionParams, UnitProfession } from "library/game-logic/unit-professions";
import { IConfig, GetCfgUidToCfg } from "../IConfig";
import { Config_Mercenary_Swordmen } from "./Config_Mercenary_Swordmen";
import { Config_Mercenary_Archer } from "./Config_Mercenary_Archer";
import { Config_Mercenary_Archer_2 } from "./Config_Mercenary_Archer_2";
import { Config_Mercenary_Heavymen } from "./Config_Mercenary_Heavymen";
import { Config_Mercenary_Raider } from "./Config_Mercenary_Raider";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";

export class Config_MercenaryCamp extends IConfig {
    public static CfgUid      : string = "#CastleFight_MercenaryCamp";
    public static BaseCfgUid  : string = "#UnitConfig_Barbarian_Shater";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Лагерь наёмников");
        // описание
        ScriptUtils.SetValue(config, "Description", "Позволяет нанять могучих войнов Теймура. Теймуровцы не верят в нашу веру, поэтому святые духи на них не действуют.");
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 60000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 300);
        // стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   500);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
        // наемники
        {
            var producerParams = config.GetProfessionParams(UnitProducerProfessionParams, UnitProfession.UnitProducer);
            // @ts-expect-error
            var produceList    = producerParams.CanProduceList;
            produceList.Clear();
            produceList.Add(GetCfgUidToCfg(Config_Mercenary_Swordmen.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Mercenary_Archer.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Mercenary_Heavymen.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Mercenary_Archer_2.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Mercenary_Raider.CfgUid));
        }
    }
}