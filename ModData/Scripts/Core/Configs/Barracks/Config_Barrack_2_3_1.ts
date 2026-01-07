import { createHordeColor } from "library/common/primitives";
import { GetCfgUidToCfg } from "../IConfig";
import { IBarrack } from "./IBarrack";
import { IAttackingUnit } from "../IAttackingUnit";
import { COMPONENT_TYPE } from "../../Components/IComponent";
import { CombatAIComponent, COMBATAI_TYPE } from "../../Components/CombatAIComponent";

export class Config_Unit_2_3_1 extends IAttackingUnit {
    public static CfgUid      : string = "#CastleFight_Unit_2_3_1";
    public static BaseCfgUid  : string = "#UnitConfig_Mage_Minotaur";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", 4000);
        // броня
        ScriptUtils.SetValue(config, "Shield", 0);
        // урон
        ScriptUtils.SetValue(config.MainArmament.ShotParams, "Damage", 500);
    }

    public static InitEntity() {
        super.InitEntity();
        this.Entity.components.set(COMPONENT_TYPE.COMBATAI_COMPONENT, new CombatAIComponent(COMBATAI_TYPE.FOCUS_MAGES));
    }
}

export class Config_Barrack_2_3_1 extends IBarrack {
    public static CfgUid      : string = "#CastleFight_Barrack_2_3_1";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_StoneBarrack";

    public static spawnedUnit        : typeof IAttackingUnit = Config_Unit_2_3_1;

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // имя
        ScriptUtils.SetValue(config, "Name", "Кузница нежити");
        // меняем цвет
        ScriptUtils.SetValue(config, "TintColor", createHordeColor(255, 203, 3, 247));
    }
}
