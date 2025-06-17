import { COMPONENT_TYPE } from "../../Components/IComponent";
import { SpawnEvent } from "../../Components/SpawnEvent";
import { IAttackingUnit } from "../IAttackingUnit";
import { GetCfgUidToCfg } from "../IConfig";

export class Config_Mercenary_Swordmen extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Mercenary_Swordmen";
    public static BaseCfgUid  : string = "#UnitConfig_Barbarian_Swordmen";
    public static spawnCount  : number = 60;

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.SPAWN_EVENT, new SpawnEvent(this.CfgUid, -1, this.spawnCount - 1));
        this.Entity.components.delete(COMPONENT_TYPE.BUFFABLE_COMPONENT);
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        ScriptUtils.SetValue(config, "Name", "Рыцарь");
        ScriptUtils.SetValue(config, "MaxHealth", 1000);
        ScriptUtils.SetValue(config, "Shield", 0);
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
        ScriptUtils.SetValue(config.CostResources, "Gold", 400);
        ScriptUtils.SetValue(config, "ProductionTime", 250);
        ScriptUtils.SetValue(config, "Description",
            config.Description
            + (config.Description == "" ? "" : "\n")
            + "Теймуровцы не верят в нашу веру, поэтому святые духи на них не действуют."
            + "Нанять " + this.spawnCount + " рыцарей:\n"
        );
    }
}