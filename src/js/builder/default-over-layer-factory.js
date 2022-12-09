import { Commons } from '@chmap/utilities';
import { MPIWGLayerConfig, SinicaLayerConfig, CHGISLayerConfig } from './layers-config/default-over-layers';

const { SnowflakeID } = Commons;

function buildLayers(config) {

    const { label: groupLabel, layers, urlTmpl, attribution: baseAttribution } = config;

    const tileLayers = [];

    for (const cfg of layers) {

        const layerId = SnowflakeID.next();

        if(cfg.type === 'tsv'){
          tileLayers.push(buildTSVLayer(layerId, cfg, baseAttribution));
        }
        else {
          tileLayers.push(buildTileLayer(layerId, cfg, urlTmpl, baseAttribution));
        }
    }

    return {
        label: groupLabel,
        layers: tileLayers,
    };

};

function buildTileLayer(layerId, layerCfg, urlTmpl, baseAttribution) {

    const {url, label, center} = layerCfg;

    const newUrl = urlTmpl.interpolate( (typeof url === 'object') ? url : { url });

    const attribution = `<br/><span class='fb'>${label}</span>, ${baseAttribution}, Tileset url: <span style="color:blue;">${newUrl}</span>`;

    return L.tileLayer(newUrl, { layerId, layerType: 'tiles', label, center, opacity: 1, attribution });

}

function buildTSVLayer(layerId, layerCfg, baseAttribution) {

    const {url, label, type} = layerCfg;

    const attribution = `<br/><span class='fb'>${label}</span>, ${baseAttribution}`;

    return {options: { layerId, layerType: type, url, label, attribution, dataLoaded: false, initFn: initTSVLayer } };

}

async function initTSVLayer(layer, afterFn){

    const { url, layerId, label, layerType  } = layer.options;

    const response = await fetch(url);

    const csvText = await response.text();

    const csvLayer = L.geoCsv(csvText, {
            layerId,
            label,
            layerType,
            dataLoaded: true,
            firstLineTitles: true,
            fieldSeparator: '\t',
            lineSeparator: '\n',
            activeWKT: true,
            WKTTitle: 'WKT',
            debug: false,
            onEachFeature: function (feature, layer) {

                const titles = layer.options.titles;

                let popup = '' ;

                let count=0;

                for (const clave in feature.properties) {

                    if (feature.properties[clave]!='') {
                        popup += ''+ titles[count]+':'+feature.properties[clave]+'<br />';
                    }
                    count++;
                }

                layer.bindPopup(popup);
            }
        })

    afterFn(csvLayer);

}

function create() {

    return [
        buildLayers(MPIWGLayerConfig),
        buildLayers(SinicaLayerConfig),
        buildLayers(CHGISLayerConfig),
    ];

}

export {
    create,
}

