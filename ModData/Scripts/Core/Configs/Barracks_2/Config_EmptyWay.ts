import { COMPONENT_TYPE } from "../../Components/IComponent";
import { UnitComponent } from "../../Components/UnitComponent";
import { UpgradableBuildingComponent } from "../../Components/UpgradableBuildingComponent";
import { GetCfgUidToCfg, IConfig } from "../IConfig";
import { Config_ArchersWay } from "./Archers/Config_ArchersWay";
import { Config_CavalryWay } from "./Cavalry/Config_CavalryWay";
import { Config_IWay } from "./Config_IWay";
import { Config_MachineryWay } from "./Machinery/Config_MachineryWay";
import { Config_MagesWay } from "./Mages/Config_MagesWay";
import { Config_UndeadWay } from "./Undead/Config_UndeadWay";

export class Config_EmptyWay extends Config_IWay {
    public static CfgUid      : string = "#CastleFight_EmptyWay";
    public static BaseCfgUid  : string = "#UnitConfig_Slavyane_Btower";

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UPGRADABLE_BUILDING_COMPONENT, new UpgradableBuildingComponent([
            Config_ArchersWay.CfgUid,
            Config_CavalryWay.CfgUid,
            Config_MachineryWay.CfgUid,
            Config_MagesWay.CfgUid,
            Config_UndeadWay.CfgUid
        ]));
    }
}