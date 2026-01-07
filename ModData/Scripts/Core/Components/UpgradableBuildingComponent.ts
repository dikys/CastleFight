import { UnitProducerProfessionParams, UnitProfession } from "library/game-logic/unit-professions";
import { GetCfgUidToCfg, HasCfgUidToCfg, OpCfgUidToEntity, SetCfgUidToCfg } from "../Configs/IConfig";
import { Entity } from "../Entity";
import { CfgAddUnitProducer, CreateUnitConfig } from "../Utils";
import { IComponent, COMPONENT_TYPE } from "./IComponent";
import { SpawnBuildingComponent } from "./SpawnBuildingComponent";
import { UnitConfig } from "library/game-logic/horde-types";

export class UpgradableBuildingComponent extends IComponent {
    /** список ид конфигов, в которые здание можно улучшить */
    upgradesCfgUid: Array<string>;

    public constructor(upgradesCfgUid: Array<string>) {
        super(COMPONENT_TYPE.UPGRADABLE_BUILDING_COMPONENT);

        this.upgradesCfgUid     = upgradesCfgUid;
        //this.upgradesUnitCfgUid = upgradesUnitCfgUid;
    }

    public Clone(): UpgradableBuildingComponent {
        return new UpgradableBuildingComponent(this.upgradesCfgUid);
    }

    public InitConfig(cfg : UnitConfig) {
        super.InitConfig(cfg);

        // даем профессию найма юнитов
        CfgAddUnitProducer(cfg);

        // добавляем в постройку дерево улучшений
        var producerParams = cfg.GetProfessionParams(UnitProducerProfessionParams, UnitProfession.UnitProducer);
        // @ts-expect-error
        var produceList    = producerParams.CanProduceList;
        ScriptUtils.SetValue(cfg, "Description", cfg.Description + (cfg.Description == "" ? "" : "\n\n") + "Можно улучшить до:");
        for (var i = 0; i < this.upgradesCfgUid.length; i++) {
            produceList.Add(this._GenerateImproveIconCfg(this.upgradesCfgUid[i]));
            this._GenerateRecursivereImprovementTree(cfg, this.upgradesCfgUid[i], "    ");
        }
    }

    /** суффикс к улучшаемому зданию, чтобы получить иконку */
    private static upgradeIconSuffix = "_upgradeIcon";
    /** вернет cfg который нужно построить, чтобы улучишить до cfgUid */
    public static GetUpgradeCfgUid (cfgUid : string) {
        return cfgUid + this.upgradeIconSuffix;
    }

    private _GenerateRecursivereImprovementTree(cfg: UnitConfig, currentCfgUid: string, shiftStr: string) {
        var currentCfg = GetCfgUidToCfg(currentCfgUid);
        ScriptUtils.SetValue(cfg, "Description", cfg.Description + "\n" + shiftStr + currentCfg.Name);

        var current_Entity = OpCfgUidToEntity.get(currentCfgUid);
        if (!current_Entity) { 
            return;
        }
        if (!current_Entity.components.has(COMPONENT_TYPE.UPGRADABLE_BUILDING_COMPONENT)) {
            return;
        }
        var current_upgradableBuildingComponent = current_Entity.components.get(COMPONENT_TYPE.UPGRADABLE_BUILDING_COMPONENT) as UpgradableBuildingComponent;
        for (var i = 0; i < current_upgradableBuildingComponent.upgradesCfgUid.length; i++) {
            this._GenerateRecursivereImprovementTree(cfg, current_upgradableBuildingComponent.upgradesCfgUid[i], shiftStr + "    ");
        }
    }

    private _GenerateImproveIconCfg(cfgUid : string) : UnitConfig {
        var iconCfgUid = UpgradableBuildingComponent.GetUpgradeCfgUid(cfgUid);
        var iconCfg : UnitConfig;
        if (!HasCfgUidToCfg(iconCfgUid)) {
            var cfg = GetCfgUidToCfg(cfgUid);
            // создаем конфиг
            if (OpCfgUidToEntity.has(cfgUid)) {
                var entity = OpCfgUidToEntity.get(cfgUid) as Entity;
                if (entity.components.has(COMPONENT_TYPE.SPAWN_BUILDING_COMPONENT)) {
                    // если данный конфиг спавнит юнитов, то иконку делаем на основе юнита
                    var spawnBuildingComponent = entity.components.get(COMPONENT_TYPE.SPAWN_BUILDING_COMPONENT) as SpawnBuildingComponent;
                    iconCfg  = CreateUnitConfig(spawnBuildingComponent.spawnUnitConfigUid, iconCfgUid);
                } else {
                    iconCfg = CreateUnitConfig(cfgUid, iconCfgUid);
                }
            } else {
                iconCfg = CreateUnitConfig(cfgUid, iconCfgUid);
            }

            // настраиваем конфиг иконки
            ScriptUtils.SetValue(iconCfg, "Name", "Улучшить до " + cfg.Name);
            ScriptUtils.SetValue(iconCfg, "Description", cfg.Description);
            ScriptUtils.SetValue(iconCfg, "ProductionTime", 250);
            ScriptUtils.SetValue(iconCfg, "MaxHealth", 1); // чтобы время постройки было ровно как надо
            ScriptUtils.SetValue(iconCfg.CostResources, "Gold",   cfg.CostResources.Gold);
            ScriptUtils.SetValue(iconCfg.CostResources, "Metal",  cfg.CostResources.Metal);
            ScriptUtils.SetValue(iconCfg.CostResources, "Lumber", cfg.CostResources.Lumber);
            ScriptUtils.SetValue(iconCfg.CostResources, "People", cfg.CostResources.People);
            iconCfg.TechConfig.Requirements.Clear();

            SetCfgUidToCfg(iconCfgUid, iconCfg);
        } else {
            iconCfg = GetCfgUidToCfg(iconCfgUid);
        }

        return iconCfg;
    }
};