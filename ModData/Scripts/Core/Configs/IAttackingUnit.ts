import { TileType, UnitFlags, UnitSpecification } from "library/game-logic/horde-types";
import { CfgSetSpeed } from "../Utils";
import { IConfig, GetCfgUidToCfg } from "./IConfig";
import { AttackingAlongPathComponent } from "../Components/AttackingAlongPathComponent";
import { BuffableComponent } from "../Components/BuffableComponent";
import { COMPONENT_TYPE } from "../Components/IComponent";
import { UnitComponent } from "../Components/UnitComponent";

export class IAttackingUnit extends IConfig {
    public static speedCoeff : number = 1.0;

    constructor() { super(); }

    public static InitEntity() {
        super.InitEntity();

        this.Entity.components.set(COMPONENT_TYPE.UNIT_COMPONENT, new UnitComponent(null, this.CfgUid));
        this.Entity.components.set(COMPONENT_TYPE.ATTACKING_ALONG_PATH_COMPONENT, new AttackingAlongPathComponent());
        this.Entity.components.set(COMPONENT_TYPE.BUFFABLE_COMPONENT, new BuffableComponent());

        // в данный момент конфиги зафиксированы, можно сделать постинициализацию
        this._PostInitConfig();
    }

    public static InitConfig() {
        super.InitConfig();
        var config = GetCfgUidToCfg(this.CfgUid);

        // устанавливаем скорость бега
        var speedMap = new Map<TileType, number>();
        if (!config.Flags.HasFlag(UnitFlags.Building)) {
            if (config.Specification.HasFlag(UnitSpecification.Rider)) {
                speedMap.set(TileType.Grass,  Math.round(this.speedCoeff * 20));
                speedMap.set(TileType.Forest, Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Water,  Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Marsh,  Math.round(this.speedCoeff * 17));
                speedMap.set(TileType.Sand,   Math.round(this.speedCoeff * 17));
                speedMap.set(TileType.Mounts, Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Road,   Math.round(this.speedCoeff * 21));
                speedMap.set(TileType.Ice,    Math.round(this.speedCoeff * 15));
            } else if (config.Specification.HasFlag(UnitSpecification.Machine)) {
                speedMap.set(TileType.Grass,  Math.round(this.speedCoeff * 10));
                speedMap.set(TileType.Water,  Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Marsh,  Math.round(this.speedCoeff * 7));
                speedMap.set(TileType.Sand,   Math.round(this.speedCoeff * 8));
                speedMap.set(TileType.Mounts, Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Road,   Math.round(this.speedCoeff * 13));
                speedMap.set(TileType.Ice,    Math.round(this.speedCoeff * 10));
            } else {
                speedMap.set(TileType.Grass,  Math.round(this.speedCoeff * 10));
                speedMap.set(TileType.Forest, Math.round(this.speedCoeff * 6));
                speedMap.set(TileType.Water,  Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Marsh,  Math.round(this.speedCoeff * 7));
                speedMap.set(TileType.Sand,   Math.round(this.speedCoeff * 8));
                speedMap.set(TileType.Mounts, Math.round(this.speedCoeff * 0));
                speedMap.set(TileType.Road,   Math.round(this.speedCoeff * 13));
                speedMap.set(TileType.Ice,    Math.round(this.speedCoeff * 10));
            }

            CfgSetSpeed(config, speedMap);
        }
    }

    private static _PostInitConfig() {
        var config = GetCfgUidToCfg(this.CfgUid);

        // Ближники
        if (config.MainArmament.Range == 1) {
            ScriptUtils.SetValue(config, "MaxHealth", Math.floor(1.5 * config.MaxHealth));
            ScriptUtils.SetValue(config, "Sight", 6);
        }
        // Дальники
        else {
            ScriptUtils.SetValue(config, "Sight", 4);
        }

        // описание юнитов
        ScriptUtils.SetValue(config, "Description",  config.Description +
            (config.Description == "" ? "" : "\n") +
            "  здоровье " + config.MaxHealth + "\n" +
            "  броня " + config.Shield + "\n" +
            (
                config.MainArmament
                ? "  атака " + config.MainArmament.ShotParams.Damage + "\n" +
                "  радиус атаки " + config.MainArmament.Range + "\n"
                : ""
            ) +
            "  скорость бега " + config.Speeds.Item.get(TileType.Grass) + "\n"
            + (config.Flags.HasFlag(UnitFlags.FireResistant) || config.Flags.HasFlag(UnitFlags.MagicResistant)
                ? "  иммунитет к " + (config.Flags.HasFlag(UnitFlags.FireResistant) ? "огню " : "") + 
                    (config.Flags.HasFlag(UnitFlags.MagicResistant) ? "магии " : "") + "\n"
                : "")
            + "  радиус видимости " + config.Sight
            );
    }
}