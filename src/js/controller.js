import * as BaseLayerFactory from './builder/base-layer-factory';
import * as DefaultOverLayerFactory from './builder/default-over-layer-factory';
import { AttributionInfo, ZoomLevelButtons } from "@chmap/leaflet-extensions";
import MapLayersPanel from './panel';

const MapLayersController = function() {

    let map = null;

    function init() {

        const {baseLayers, defaultLayer} = BaseLayerFactory.create();

        map = L.map("map", {
            center: [35, 108],
            attributionControl: false,
            zoom: 4,
            minZoom: 0,
            maxZoom: 16,
            layers: [defaultLayer],
        });

        map.whenReady(
        () => {
            //sometimes, leaflet component doesn't expand its height in a good result initially.
            //trigger a window resize event to force it to re-calculate its available height again.
            window.dispatchEvent(new Event('resize'));
        }
        )

        map.removeControl(map.zoomControl);

        // L.control.attribution({ position: "bottomleft" }).addTo(map);

        AttributionInfo.init(map);

        ZoomLevelButtons.addTo(map);

        MapLayersPanel.init(map, baseLayers, defaultLayer, DefaultOverLayerFactory.create());

        MapLayersPanel.show();

        cmpEventBinding();

    }

    function getMap() {

        return map;

    }

    function hookShowMapLayerListTo(showBtn) {

        showBtn.onclick = (e) => {
            e.preventDefault();
            MapLayersPanel.show();
        }
    }

    function bindSidebarEvents(sidebar) {

        // force leaflet to re-calculate its width when a user expands or collapses the sidebar.
        const triggerResizeEvent = () => window.dispatchEvent(new Event('resize'));

        sidebar.addEventListener('shown.bs.collapse', triggerResizeEvent);
        sidebar.addEventListener('hidden.bs.collapse', triggerResizeEvent);

    }

    function cmpEventBinding() {

        // MapLayersPanel events
        MapLayersPanel.on('tilesUrlCopied', async (url) => {

            const {Notification} = await import("@chmap/utilities");

            //TODO: i18n
            Notification.show(url + "<br><br>" + "Layer's Tileset URL Copied");
        });

        MapLayersPanel.on('showIIIFViewer', async (params) => {

            const {IIIFViewer} = await import('@chmap/utilities');

            IIIFViewer.open(params);
        });

        MapLayersPanel.on('exception', async (info) => {

            const {Notification} = await import("@chmap/utilities");

            Notification.show(info, 'danger');
        });
    }

    function hideMapLayerList() {
        MapLayersPanel.hide();
    }

    function addIntoYourLayer(layers) {
        MapLayersPanel.addIntoYourLayer(layers)
        MapLayersPanel.show();
    }

    return {
        init,
        getMap,
        hookShowMapLayerListTo,
        bindSidebarEvents,
        hideMapLayerList,
        addIntoYourLayer,
    }

}();

export default MapLayersController;
