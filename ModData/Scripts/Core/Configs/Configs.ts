import { Config_ArchersBarrack_1_1, Config_ArchersUnit_1_1 } from "./Barracks_2/Archers/Config_ArchersBarrack_1_1";
import { Config_ArchersBarrack_1_2, Config_ArchersUnit_1_2 } from "./Barracks_2/Archers/Config_ArchersBarrack_1_2";
import { Config_ArchersWay } from "./Barracks_2/Archers/Config_ArchersWay";
import { Config_CavalryBarrack_2_2, Config_CavalryUnit_2_2 } from "./Barracks_2/Cavalry/Config_CavalryBarrack_2_2";
import { Config_CavalryBarrack_2_2_1, Config_CavalryUnit_2_2_1 } from "./Barracks_2/Cavalry/Config_CavalryBarrack_2_2_1";
import { Config_CavalryWay } from "./Barracks_2/Cavalry/Config_CavalryWay";
import { Config_Barrack_1, Config_Unit_1 } from "./Barracks_2/Config_Barrack_1";
import { Config_Barrack_2, Config_Unit_2 } from "./Barracks_2/Config_Barrack_2";
import { Config_EmptyWay } from "./Barracks_2/Config_EmptyWay";
import { IBarrack } from "./Barracks_2/IBarrack";
import { Config_MachineryBarrack_1_1_2, Config_MachineryUnit_1_1_2 } from "./Barracks_2/Machinery/Config_MachineryBarrack_1_1_2";
import { Config_MachineryBarrack_1_2_1, Config_MachineryUnit_1_2_1 } from "./Barracks_2/Machinery/Config_MachineryBarrack_1_2_1";
import { Config_MachineryWay } from "./Barracks_2/Machinery/Config_MachineryWay";
import { Config_MagesBarrack_1_1_1, Config_MagesUnit_1_1_1 } from "./Barracks_2/Mages/Config_MagesBarrack_1_1_1";
import { Config_MagesBarrack_1_1_1_1, Config_MagesUnit_1_1_1_1 } from "./Barracks_2/Mages/Config_MagesBarrack_1_1_1_1";
import { Config_MagesBarrack_1_1_1_2, Config_MagesUnit_1_1_1_2 } from "./Barracks_2/Mages/Config_MagesBarrack_1_1_1_2";
import { Config_MagesWay } from "./Barracks_2/Mages/Config_MagesWay";
import { Config_MeleeBarrack_2_1, Config_MeleeUnit_2_1 } from "./Barracks_2/Melee/Config_MeleeBarrack_2_1";
import { Config_MeleeBarrack_2_1_1, Config_MeleeUnit_2_1_1 } from "./Barracks_2/Melee/Config_MeleeBarrack_2_1_1";
import { Config_MeleeBarrack_2_1_2, Config_MeleeUnit_2_1_2 } from "./Barracks_2/Melee/Config_MeleeBarrack_2_1_2";
import { Config_MelleWay } from "./Barracks_2/Melee/Config_MelleWay";
import { Config_UndeadBarrack_2_3, Config_UndeadUnit_2_3 } from "./Barracks_2/Undead/Config_UndeadBarrack_2_3";
import { Config_UndeadBarrack_2_3_1, Config_UndeadUnit_2_3_1 } from "./Barracks_2/Undead/Config_UndeadBarrack_2_3_1";
import { Config_UndeadWay } from "./Barracks_2/Undead/Config_UndeadWay";
import { Config_Church } from "./Church/Config_Church";
import { Config_Holy_spirit_accuracy } from "./Church/Config_Holy_spirit_accuracy";
import { Config_Holy_spirit_attack } from "./Church/Config_Holy_spirit_attack";
import { Config_Holy_spirit_cloning } from "./Church/Config_Holy_spirit_cloning";
import { Config_Holy_spirit_defense } from "./Church/Config_Holy_spirit_defense";
import { Config_Holy_spirit_health } from "./Church/Config_Holy_spirit_health";
import { Config_Castle } from "./Config_Castle";
import { Config_Worker } from "./Config_Worker";
import { IAttackingUnit } from "./IAttackingUnit";
import { IConfig } from "./IConfig";
import { Config_Mercenary_Archer } from "./Mercenary/Config_Mercenary_Archer";
import { Config_Mercenary_Archer_2 } from "./Mercenary/Config_Mercenary_Archer_2";
import { Config_Mercenary_Heavymen } from "./Mercenary/Config_Mercenary_Heavymen";
import { Config_Mercenary_Raider } from "./Mercenary/Config_Mercenary_Raider";
import { Config_Mercenary_Swordmen } from "./Mercenary/Config_Mercenary_Swordmen";
import { Config_MercenaryCamp } from "./Mercenary/Config_MercenaryCamp";

/** для корректной генерации описания нужен правильный порядок */
export var BarrackConfigs : Array<typeof IBarrack> = [
    Config_ArchersBarrack_1_1,
    Config_ArchersBarrack_1_2,
    
    Config_CavalryBarrack_2_2_1,
    Config_CavalryBarrack_2_2,

    Config_MachineryBarrack_1_1_2,
    Config_MachineryBarrack_1_2_1,
    
    Config_MagesBarrack_1_1_1_1,
    Config_MagesBarrack_1_1_1_2,
    Config_MagesBarrack_1_1_1,
    
    Config_MeleeBarrack_2_1_1,
    Config_MeleeBarrack_2_1_2,
    Config_MeleeBarrack_2_1,
    
    Config_UndeadBarrack_2_3_1,
    Config_UndeadBarrack_2_3,

    Config_Barrack_1,
    Config_Barrack_2
];

export var BarrackUnitConfigs : Array<typeof IAttackingUnit> = [
    Config_ArchersUnit_1_1,
    Config_ArchersUnit_1_2,
    
    Config_CavalryUnit_2_2_1,
    Config_CavalryUnit_2_2,

    Config_MachineryUnit_1_1_2,
    Config_MachineryUnit_1_2_1,
    
    Config_MagesUnit_1_1_1_1,
    Config_MagesUnit_1_1_1_2,
    Config_MagesUnit_1_1_1,
    
    Config_MeleeUnit_2_1_1,
    Config_MeleeUnit_2_1_2,
    Config_MeleeUnit_2_1,
    
    Config_UndeadUnit_2_3_1,
    Config_UndeadUnit_2_3,

    Config_Unit_1,
    Config_Unit_2
];

export var UsedConfigs : Array<typeof IConfig> = [
    Config_MagesWay,
    Config_MelleWay,
    Config_UndeadWay,
    Config_ArchersWay,
    Config_CavalryWay,
    Config_MachineryWay,
    Config_EmptyWay,

    ...BarrackUnitConfigs,
    ...BarrackConfigs,
    Config_Castle,

    Config_Holy_spirit_accuracy,
    Config_Holy_spirit_attack,
    Config_Holy_spirit_cloning,
    Config_Holy_spirit_defense,
    Config_Holy_spirit_health,
    Config_Church,

    Config_Mercenary_Swordmen,
    Config_Mercenary_Archer,
    Config_Mercenary_Archer_2,
    Config_Mercenary_Heavymen,
    Config_Mercenary_Raider,
    Config_MercenaryCamp,
    
    Config_Worker
]