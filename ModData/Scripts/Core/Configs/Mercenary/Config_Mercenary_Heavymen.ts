import { COMPONENT_TYPE } from "../../Components/IComponent";
import { SpawnEvent } from "../../Components/SpawnEvent";
import { IAttackingUnit } from "../IAttackingUnit";
import { GetCfgUidToCfg } from "../IConfig";

export class Config_Mercenary_Heavymen extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Mercenary_Heavymen";
    public static BaseCfgUid  : string = "#UnitConfig_Barbarian_Heavymen";
    public static spawnCount  : number = 30;

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.SPAWN_EVENT, new SpawnEvent(this.CfgUid, -1, this.spawnCount - 1));
        this.Entity.components.delete(COMPONENT_TYPE.BUFFABLE_COMPONENT);
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        ScriptUtils.SetValue(config, "Name", "Батыр");
        ScriptUtils.SetValue(config, "MaxHealth", 1500);
        ScriptUtils.SetValue(config, "Shield", 200);
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
        ScriptUtils.SetValue(config.CostResources, "Gold", 400);
        ScriptUtils.SetValue(config, "ProductionTime", 250);
        ScriptUtils.SetValue(config, "Description", 
            config.Description
            + (config.Description == "" ? "" : "\n")
            + "Теймуровцы не верят в нашу веру, поэтому святые духи на них не действуют.\n"
            + "Нанять " + this.spawnCount + " батыров:\n"
        );
    }
}