import { UnitCommand } from "library/game-logic/horde-types";
import { GetCfgUidToCfg, IConfig } from "./IConfig";
import { UnitProfession } from "library/game-logic/unit-professions";

export class Config_Castle extends IConfig {
    /** коэффициент ХП */
    public static HealthCoeff : number = 1.0;

    public static CfgUid      : string = "#CastleFight_Castle";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_StoneCastle";

    constructor() { super(); }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // запрещаем самоуничтожение
        config.AllowedCommands.Remove(UnitCommand.DestroySelf);
        // убираем строительство
        config.ProfessionParams.Remove(UnitProfession.UnitProducer);
        // убираем починку
        config.ProfessionParams.Remove(UnitProfession.Reparable);
        // здоровье
        ScriptUtils.SetValue(config, "MaxHealth", Math.round(300000*this.HealthCoeff));
        // броня
        ScriptUtils.SetValue(config, "Shield", 200);
        // увеличиваем видимость
        ScriptUtils.SetValue(config, "Sight", 12);
    }
}
