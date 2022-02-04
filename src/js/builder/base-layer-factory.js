import L from "leaflet";
import 'leaflet-providers';

import baseLayers from "./layers-config/baselayers";

export function create() {

    const layers = [];

    for (const fg of baseLayers) {

        const {name, label, provider, url, attribution} = fg;

        layers.push({
            name,
            label,
            layer: (provider)
            ? L.tileLayer.provider(provider)
            : L.tileLayer(url, {attribution})
        });
    }

    return {
        baseLayers: layers,
        defaultLayer: layers[layers.length - 1].layer,
    };
}
