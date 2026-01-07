import { mergeFlags } from "library/dotnet/dotnet-utils";
import { UnitCommand, UnitFlags } from "library/game-logic/horde-types";
import { UnitProfession, UnitProducerProfessionParams } from "library/game-logic/unit-professions";
import { Cell } from "../Utils";
import { Config_Barrack_1 } from "./Barracks/Config_Barrack_1";
import { Config_Barrack_2 } from "./Barracks/Config_Barrack_2";
import { Config_Church } from "./Church/Config_Church";
import { IConfig, GetCfgUidToCfg } from "./IConfig";
import { Config_MercenaryCamp } from "./Mercenary/Config_MercenaryCamp";
import { COMPONENT_TYPE } from "../Components/IComponent";
import { ReviveComponent } from "../Components/ReviveComponent";
import { UnitComponent } from "../Components/UnitComponent";


export class Config_Worker extends IConfig {
    public static CfgUid      : string = "#CastleFight_Worker";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Worker1";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        this.Entity.components.set(COMPONENT_TYPE.REVIVE_COMPONENT, new ReviveComponent(new Cell(0,0), 500, -1));
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // устанавливаем имя
        ScriptUtils.SetValue(config, "Name", "Работяга");
        // удаляем команду атаки
        config.AllowedCommands.Remove(UnitCommand.Attack);
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 2000);
        // число людей
        ScriptUtils.SetValue(config.CostResources, "People", 0);
        // добавляем иммун к огню
        ScriptUtils.SetValue(config, "Flags", mergeFlags(UnitFlags, config.Flags, UnitFlags.FireResistant));
        // убираем профессию добычу
        if (config.ProfessionParams.ContainsKey(UnitProfession.Harvester)) {
            config.ProfessionParams.Remove(UnitProfession.Harvester);
        }
        // делаем его не даващимся
        ScriptUtils.SetValue(config, "PressureResist", 13);
        
        // добавляем постройки
        {
            var producerParams = config.GetProfessionParams(UnitProducerProfessionParams, UnitProfession.UnitProducer);
            // @ts-expect-error
            var produceList    = producerParams.CanProduceList;
            produceList.Clear();
            produceList.Add(GetCfgUidToCfg(Config_Barrack_1.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Barrack_2.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_Church.CfgUid));
            produceList.Add(GetCfgUidToCfg(Config_MercenaryCamp.CfgUid));
        }
    }
}
