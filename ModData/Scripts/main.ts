import { activePlugins } from "active-plugins";
import { BeammanPlugin } from "./Dependencies/beamman";
import { CastleFightPlugin } from "./Core/CastleFightPlugin";
import { Mara } from "../Mara/Mara"

/**
 * Вызывается до вызова "onFirstRun()" при первом запуске скрипт-машины, а так же при hot-reload
 */
export function onInitialization() {
    Mara.CanRun = false;

    // Инициализация плагинов
    activePlugins.register(new BeammanPlugin());
    activePlugins.register(new CastleFightPlugin());
}

//export function onInitialization() {
//    hordePlugins.registerPlugin(new CastleFight.CastleFightPlugin());
//}