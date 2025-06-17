import { UnitConfig, UnitFlags } from "library/game-logic/horde-types";
import { CreateUnitConfig } from "../Utils";
import { getUnitProfessionParams, UnitProducerProfessionParams, UnitProfession } from "library/game-logic/unit-professions";
import { Entity } from "../Entity";
import { log } from "library/common/logging";

/** все конфиги */
var OpCfgUidToCfg    : Map<string, UnitConfig> = new Map<string, UnitConfig>();
/** сущности для конфигов */
export var OpCfgUidToEntity : Map<string, Entity> = new Map<string, Entity>();

export function GetCfgUidToCfg(cfgUid : string) : UnitConfig {
    var config = OpCfgUidToCfg.get(cfgUid);
    if (!cfgUid) {
        log.exception("cfgUid is null");
    }
    return config as UnitConfig;
}

export function HasCfgUidToCfg(cfgUid : string) : boolean {
    var config = OpCfgUidToCfg.get(cfgUid);
    return config != undefined;
}

export function SetCfgUidToCfg(cfgUid : string, config : UnitConfig) {
    OpCfgUidToCfg.set(cfgUid, config);
}

export function ClearCfgUidToCfg() {
    for (var cfgId in OpCfgUidToCfg) {
        var config = OpCfgUidToCfg.get(cfgId);
        if (!config) continue;
        HordeContentApi.RemoveConfig(config);
    }
    OpCfgUidToCfg.clear();
}

export class IConfig {
    public static CfgUid      : string = "";
    public static BaseCfgUid  : string = "";
    public static Entity      : Entity;
    
    constructor () {}

    public static InitEntity() {
        this.Entity = new Entity();
        OpCfgUidToEntity.set(this.CfgUid, this.Entity);
    }

    public static InitConfig() {
        // создаем конфиг
        var config = CreateUnitConfig(this.BaseCfgUid, this.CfgUid);

        // убираем требования
        config.TechConfig.Requirements.Clear();
        // описание
        ScriptUtils.SetValue(config, "Description", "");
        // убираем производство людей
        ScriptUtils.SetValue(config, "ProducedPeople", 0);
        // убираем налоги
        ScriptUtils.SetValue(config, "SalarySlots", 0);
        // делаем 0-ую стоимость
        ScriptUtils.SetValue(config.CostResources, "Gold",   0);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 0);
        ScriptUtils.SetValue(config.CostResources, "People", 0);

        // убираем дружественный огонь
        if (config.MainArmament) {
            var bulletCfg = HordeContentApi.GetBulletConfig(config.MainArmament.BulletConfig.Uid);
            ScriptUtils.SetValue(bulletCfg, "CanDamageAllied", false);
        }
        // убираем захват
        if (config.ProfessionParams.ContainsKey(UnitProfession.Capturable)) {
            config.ProfessionParams.Remove(UnitProfession.Capturable);
        }
        // здания
        if (config.Flags.HasFlag(UnitFlags.Building)) {
            // настраиваем починку
            if (config.ProfessionParams.ContainsKey(UnitProfession.Reparable)) {
                // @ts-expect-error
                ScriptUtils.SetValue(config.ProfessionParams.Item.get(UnitProfession.Reparable).RecoverCost, "Gold",   0);
                // @ts-expect-error
                ScriptUtils.SetValue(config.ProfessionParams.Item.get(UnitProfession.Reparable).RecoverCost, "Metal",  0);
                // @ts-expect-error
                ScriptUtils.SetValue(config.ProfessionParams.Item.get(UnitProfession.Reparable).RecoverCost, "Lumber", 0);
                // @ts-expect-error
                ScriptUtils.SetValue(config.ProfessionParams.Item.get(UnitProfession.Reparable).RecoverCost, "People", 0);
                ScriptUtils.SetValue(config.ProfessionParams.Item.get(UnitProfession.Reparable), "RecoverTime", 4000);
            }
        }
        // очищаем список построек (чтобы нормально работал перезапуск)
        if (getUnitProfessionParams(config, UnitProfession.UnitProducer)) {
            // очищаем список
            var producerParams = config.GetProfessionParams(UnitProducerProfessionParams, UnitProfession.UnitProducer);
            // @ts-expect-error
            var produceList    = producerParams.CanProduceList;
            produceList.Clear();
        }

        SetCfgUidToCfg(this.CfgUid, config);
    }
}
