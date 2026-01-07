import { IConfig, GetCfgUidToCfg } from "../IConfig";
import { IAttackingUnit } from "../IAttackingUnit";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { SpawnBuildingComponent } from "../../Components/SpawnBuildingComponent";
import { UnitComponent } from "../../Components/UnitComponent";
import { UpgradableBuildingComponent } from "../../Components/UpgradableBuildingComponent";

export class IBarrack extends IConfig {
    public static spawnedUnit        : typeof IAttackingUnit;
    public static spawnPeriod        : number = 1500;
    public static improvesToBarracks : Array<typeof IBarrack>;
    public static spawnCount         : number = 1;

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        this.Entity.components.set(COMPONENT_TYPE.SPAWN_BUILDING_COMPONENT, new SpawnBuildingComponent(this.spawnedUnit.CfgUid, -1, this.spawnPeriod, this.spawnCount));
        if (this.improvesToBarracks && this.improvesToBarracks.length > 0) {
            var improvesToBarracksCfgUid     = new Array<string>();
            for (var i = 0; i < this.improvesToBarracks.length; i++) {
                improvesToBarracksCfgUid.push(this.improvesToBarracks[i].CfgUid);
            }
            this.Entity.components.set(COMPONENT_TYPE.UPGRADABLE_BUILDING_COMPONENT,
                new UpgradableBuildingComponent(improvesToBarracksCfgUid));
        }
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // стоимость обычного улучшаемого здания
        ScriptUtils.SetValue(config.CostResources, "Gold",   100);
        ScriptUtils.SetValue(config.CostResources, "Metal",  0);
        ScriptUtils.SetValue(config.CostResources, "Lumber", 100);
        ScriptUtils.SetValue(config.CostResources, "People", 0);
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 60000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // время постройки улучшения
        ScriptUtils.SetValue(config, "ProductionTime", 500);
    }
}