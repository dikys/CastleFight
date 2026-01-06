import { createPoint } from "library/common/primitives";
import { spawnBullet } from "library/game-logic/bullet-spawn";
import { UnitState, StateMotion, UnitAnimState, AnimatorScriptTasks, WorldConstants } from "library/game-logic/horde-types";
import { setUnitStateWorker } from "library/game-logic/workers";
import HordePluginBase from "plugins/base-plugin";


/**
 * Плагин для обработки юнита "Воин с дубиной".
 */
export class BeammanPlugin extends HordePluginBase {
    // @ts-expect-error
    private hitTable;
    private hitSounds: any;
    public static plugin: BeammanPlugin;

    /**
     * Конструктор.
     */
    public constructor() {
        super("Воин с дубиной");
        BeammanPlugin.plugin = this;
    }

    /**
     * Метод вызывается при загрузке сцены и после hot-reload.
     */
    public onFirstRun() {
        this.hitTable = createHitTable();
        this.hitSounds = HordeContentApi.GetSoundsCatalog("#SoundsCatalog_Hits_Mele_Dubina_02eb130f59b6");
        
        // Установка обработчика удара
        let unitCfg = HordeContentApi.GetUnitConfig("#UnitConfig_Slavyane_Beamman");
        setUnitStateWorker("BeammanPlugin", unitCfg, UnitState.Hit, this.stateWorker_Hit);
    }

    /**
     * Обработчик состояния Hit для воина с дубиной
     */
    private stateWorker_Hit(u: any) {
        let motion = u.OrdersMind.ActiveMotion;  // Здесь MotionHit
        if (motion.IsUnprepared)
        {
            motion.State = StateMotion.InProgress;

            const stage = 0;
            const looped = false;
            u.VisualMind.SetAnimState(UnitAnimState.Attack, stage, looped);
        }

        // Произвести удар в момент, который задан анимацией (обычно, когда оружие достигает цели)
        if (u.VisualMind.Animator.HasTask(AnimatorScriptTasks.Hit))
        {
            // Дубина бьёт три раза, начиная с 4-го кадра (задано в "beamman.ginf")

            // Вычисляем номер текущего удара
            let hitNum = (u.VisualMind.Animator.CurrentAnimFrame - 4);

            // Удар
            BeammanPlugin.plugin.makeOneHit(u, motion, hitNum);

            // Звуки боя на первый удар
            if (hitNum == 0) {
                u.SoundsMind.UtterSound(BeammanPlugin.plugin.hitSounds, "Hit", u.Position.ToPoint2D());
            }

            // Устанавливаем время перезарядки
            u.ReloadCounter = u.Cfg.ReloadTime;

            // Отмечаем, что удар был произведен
            u.VisualMind.Animator.CompleteTask(AnimatorScriptTasks.Hit);
        }

        // Движение удара считается завершенным только на последнем кадре анимации
        if (u.VisualMind.Animator.IsAnimationCompleted)
        {
            motion.State = StateMotion.Done;

            u.VisualMind.SetAnimState(UnitAnimState.Stand);
        }
        else
        {
            motion.State = StateMotion.InProgress;
        }
    }

    
    /**
     * Выполняет один удар.
     */
    private makeOneHit(u:any, motion:any, hitNum:number) {
        // Смещения координат удара относительно центра воина в зависимости от направления
        let hits = BeammanPlugin.plugin.hitTable[u.Direction.ToString()];
        if (!hits) {
            return;
        }

        // Смещение текущего удара
        let hitBias = hits[hitNum];
        if (!hitBias) {
            return;
        }

        // Координаты текущего удара
        let unitPos        = u.Position.ToPoint2D();
        let targetPosition = createPoint(Math.round(hitBias.X + unitPos.X), Math.round(hitBias.Y + unitPos.Y));

        // Дружественным воинам урон не наносим
        let unitInCell = u.Scena.UnitsMap.GetUpperUnit(Math.floor(targetPosition.X / WorldConstants.CellSize),
                                                       Math.floor(targetPosition.Y / WorldConstants.CellSize));
        if (unitInCell != null && unitInCell.Owner.Diplomacy.IsAllianceStatus(u.Owner)) {
            // Исключение - здания и те, кого юнит атакует умышленно
            if (!unitInCell.Cfg.IsBuilding && unitInCell != motion.Target) {
                return;
            }
        }

        // Создание снаряда
        let armament = u.BattleMind.SelectedArmament;
        spawnBullet(u, motion.Target, armament, armament.BulletConfig, armament.ShotParams, targetPosition, targetPosition, motion.TargetMapLayer);

        // В большинстве случаев для создания снаряда удобно использовать метод "Shot",
        // но он не позволяет задать SourcePosition, который необходим здесь для удара дубины
        //u.BattleMind.SelectedArmament.Shot(u, motion.Target, targetPosition, motion.TargetMapLayer);
    }
}


/**
 * Таблица смещений удара относительно центра воина по направлениям.
 */
function createHitTable() {
    return {
        "Up": [
            createPoint(25,-25),
            createPoint(0,-25),
            createPoint(-25,-25),
        ],
        "RightUp": [
            createPoint(25, -3),
            createPoint(25,-25),
            createPoint(0,-25),
        ],
        "Right": [
            createPoint(25, 25),
            createPoint(25, -3),
            createPoint(25,-25),
        ],
        "RightDown": [
            createPoint(0, 20),
            createPoint(25, 25),
            createPoint(25, -3),
        ],
        "Down": [
            createPoint(-25, 25),
            createPoint(0, 20),
            createPoint(25, 25),
        ],
        "LeftDown": [
            createPoint(-25,  3),
            createPoint(-25, 25),
            createPoint(0, 20),
        ],
        "Left": [
            createPoint(-25,-25),
            createPoint(-25,  3),
            createPoint(-25, 25),
        ],
        "LeftUp": [
            createPoint(0,-25),
            createPoint(-25,-25),
            createPoint(-25,  3),
        ],
    };
}
