import { Commons } from '@chmap/utilities';
import { MPIWGLayerConfig, SinicaLayerConfig, CHGISLayerConfig } from './layers-config/default-over-layers';

const { SnowflakeID } = Commons;

function buildLayers(config) {

    const { label: groupLabel, layers, urlTmpl, attribution: baseAttribution } = config;

    const tileLayers = [];

    for (const cfg of layers) {

        const {url, label, center} = cfg;

        const newUrl = urlTmpl.interpolate( (typeof url === 'object') ? url : { url });

        const attribution = `<br/><span class='fb'>${label}</span>, ${baseAttribution}, Tileset url: <span style="color:blue;">${newUrl}</span>`;

        const layerId = SnowflakeID.next();

        tileLayers.push(L.tileLayer(newUrl, { layerId, label, center, opacity: 1, attribution }));
    }

    return {
        label: groupLabel,
        layers: tileLayers,
    };

};


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

